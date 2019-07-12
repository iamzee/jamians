import User from '../models/user';
import {upload, download} from '../azure/blob';
import formidable from 'formidable';
import uuid from 'uuid/v1';
import tmp from 'tmp';
import p from 'path';

export const create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const list = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({users});
  } catch (e) {
    res.status(500).send();
  }
};

export const read = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const {id} = req.params;

    if (id !== req.user._id.toString()) {
      return res.status(403).send();
    }

    const user = await User.findByIdAndUpdate(id, req.body, {new: true});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {}
};

export const addFriendRequestSent = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {friendRequestsSent: friendId},
      },
      {new: true}
    );
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const removeFriendRequestSent = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {friendRequestsSent: friendId},
      },
      {new: true}
    );
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const addFriend = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const friendRequest = req.user.friendRequestsReceived.find(
      friendRequests => friendRequests.toString() === friendId
    );

    if (!friendRequest) {
      return res.status(400).send();
    }

    const friend = await User.findByIdAndUpdate(friendId, {
      $pull: {friendRequestsSent: userId},
      $push: {friends: userId},
    });

    if (!friend) {
      return res.status(404).send();
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {friendRequestsReceived: friendId},
        $push: {friends: friendId},
      },
      {new: true}
    );

    res.send(user);
  } catch (e) {}
};

export const removeFriend = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const friend = await User.findByIdAndUpdate(
      friendId,
      {$pull: {friends: userId}},
      {new: true}
    );

    if (!friend) {
      return res.status(404).send();
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {$pull: {friends: friendId}},
      {new: true}
    );
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const currentUser = (req, res) => {
  res.send(req.user);
};

export const addAvatar = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 0.5 * 1024 * 1024;
  form.parse(req, async function(err, fields, files) {
    if (err) {
      return res.status(400).send({error: err.message});
    }
    try {
      let blobName = uuid();
      if (files.avatar.type === 'image/png') {
        blobName = `${blobName}.png`;
      } else if (files.avatar.type === 'image/jpeg') {
        blobName = `${blobName}.jpg`;
      } else {
        return res.status(400).send({error: 'Invalid file type.'});
      }
      await upload('avatar', blobName, files.avatar.path);
      await User.findByIdAndUpdate(
        req.params.id,
        {avatar: blobName},
        {new: true}
      );
      res.send();
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
};

export const getAvatar = (req, res) => {
  try {
    tmp.dir({unsafeCleanup: true}, async function _tempDirCreated(
      err,
      path,
      cleanCallback
    ) {
      if (err) {
        throw new Error(err);
      }

      console.log('Dir: ', path);

      const user = await User.findById(req.params.id);

      const blob = await download('avatar', user.avatar, path);

      res.set('Content-Type', blob.contentSettings.contentType);
      res.sendFile(p.resolve(path, user.avatar));

      cleanCallback();
    });
  } catch (e) {
    res.status(500).send(e);
  }
};
