import User from '../models/user';
import {upload, download, deleteBlob} from '../azure/blob';
import formidable from 'formidable';
import uuid from 'uuid/v1';
import tmp from 'tmp';
import p from 'path';
import _ from 'lodash';
import Department from '../models/department';
import Course from '../models/course';

export const create = async (req, res) => {
  try {
    let data = _.pick (req.body, [
      'name',
      'email',
      'password',
      'department',
      'course',
    ]);

    if (data.department && !data.course) {
      return res.status (400).send ({
        error: 'Department and Course fields are required for a student.',
      });
    }

    if (data.department) {
      const department = await Department.findById (data.department);
      const course = await Course.findOne ({
        _id: data.course,
        department: data.department,
      });

      if (!department || !course) {
        return res.status (400).send ();
      }
    }

    const user = new User (data);
    await user.save ();
    res.send (user);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const list = async (req, res) => {
  try {
    const users = await User.find ({});
    res.send ({users});
  } catch (e) {
    res.status (500).send ();
  }
};

export const read = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById (id);

    if (!user) {
      return res.status (404).send ();
    }

    res.send (user);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const updateMe = async (req, res) => {
  try {
    const allowedUpdates = [
      'name',
      'email',
      'password',
      'department',
      'course',
    ];
    const data = _.pick (req.body, allowedUpdates);

    let user = await User.findById (req.user._id);

    if (!user) {
      return res.status (404).send ();
    }

    if (data.department && !data.course) {
      return res.status (400).send ({
        error: 'Both department and course fields are required for a student',
      });
    }

    if (data.department && data.course) {
      const matchedDepartment = await Department.findById (data.department);
      const matchedCourse = await Course.findOne ({
        _id: data.course,
        department: data.department,
      });

      if (!matchedDepartment || !matchedCourse) {
        return res.status (400).send ();
      }
    }

    _.keysIn (data).forEach (key => {
      user[key] = data[key];
    });

    await user.save ();
    res.send (user);
  } catch (e) {
    console.log (e);
    res.status (400).send (e);
  }
};

export const addFriendRequestSent = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate (
      userId,
      {
        $push: {friendRequestsSent: friendId},
      },
      {new: true}
    );
    res.send (user);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const removeFriendRequestSent = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate (
      userId,
      {
        $pull: {friendRequestsSent: friendId},
      },
      {new: true}
    );
    res.send (user);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const addFriend = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const friendRequest = req.user.friendRequestsReceived.find (
      friendRequests => friendRequests.toString () === friendId
    );

    if (!friendRequest) {
      return res.status (400).send ();
    }

    const friend = await User.findByIdAndUpdate (friendId, {
      $pull: {friendRequestsSent: userId},
      $push: {friends: userId},
    });

    if (!friend) {
      return res.status (404).send ();
    }

    const user = await User.findByIdAndUpdate (
      userId,
      {
        $pull: {friendRequestsReceived: friendId},
        $push: {friends: friendId},
      },
      {new: true}
    );

    res.send (user);
  } catch (e) {}
};

export const removeFriend = async (req, res) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const friend = await User.findByIdAndUpdate (
      friendId,
      {$pull: {friends: userId}},
      {new: true}
    );

    if (!friend) {
      return res.status (404).send ();
    }

    const user = await User.findByIdAndUpdate (
      userId,
      {$pull: {friends: friendId}},
      {new: true}
    );
    res.send (user);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const readMe = (req, res) => {
  res.send (req.user);
};

export const addAvatar = (req, res) => {
  let form = new formidable.IncomingForm ();
  form.keepExtensions = true;
  form.maxFileSize = 0.5 * 1024 * 1024;
  form.parse (req, async function (err, fields, files) {
    if (err) {
      return res.status (400).send ({error: err.message});
    }
    try {
      let blobName = uuid ();
      if (files.avatar.type === 'image/png') {
        blobName = `${blobName}.png`;
      } else if (files.avatar.type === 'image/jpeg') {
        blobName = `${blobName}.jpg`;
      } else {
        return res.status (400).send ({error: 'Invalid file type.'});
      }
      await upload ('avatar', blobName, files.avatar.path);
      const user = await User.findByIdAndUpdate (
        req.params.id,
        {avatar: blobName},
        {new: true}
      );

      if (!user) {
        res.status (404).send ();
      }

      res.send ();
    } catch (e) {
      console.log (e);
      res.status (500).send (e);
    }
  });
};

export const readAvatar = (req, res) => {
  try {
    tmp.dir ({unsafeCleanup: true}, async function _tempDirCreated (
      err,
      path,
      cleanCallback
    ) {
      if (err) {
        throw new Error (err);
      }

      console.log ('Dir: ', path);

      const user = await User.findById (req.params.id);

      const blob = await download ('avatar', user.avatar, path);

      res.set ('Content-Type', blob.contentSettings.contentType);
      res.sendFile (p.resolve (path, user.avatar));

      cleanCallback ();
    });
  } catch (e) {
    res.status (500).send (e);
  }
};

export const updateMyAvatar = async (req, res) => {
  let form = new formidable.IncomingForm ();
  form.keepExtensions = true;
  form.maxFileSize = 0.5 * 1024 * 1024;
  form.parse (req, async function (err, fields, files) {
    if (err) {
      return res.status (400).send ({error: err.message});
    }
    try {
      let user = await User.findById (req.user._id);

      if (user.avatar) {
        await deleteBlob ('avatar', user.avatar);
      }

      let blobName = uuid ();
      if (files.avatar.type === 'image/png') {
        blobName = `${blobName}.png`;
      } else if (files.avatar.type === 'image/jpeg') {
        blobName = `${blobName}.jpg`;
      } else {
        return res.status (400).send ({error: 'Invalid file type.'});
      }
      await upload ('avatar', blobName, files.avatar.path);
      user.avatar = blobName;

      await user.save ();

      res.send ();
    } catch (e) {
      console.log (e);
      res.status (500).send (e);
    }
  });
};
