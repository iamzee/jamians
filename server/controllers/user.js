import User from '../models/user';

export const create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.send(400).send(e);
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
      {new: trur}
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
