import User from '../models/user';

export const addFriendRequestReceived = async (req, res, next) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    // CHECK IF FRIEND EXISTS
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).send();
    }

    // CHECK IF REQUEST ALREADY SENT
    const friendRequestAlreadyExist = friend.friendRequestsReceived.find(
      friend => friend.toString() === userId.toString()
    );
    if (friendRequestAlreadyExist) {
      return res.status(400).send();
    }

    // CHECK IF ALREADY A FRIEND
    const friendExist = friend.friends.find(
      friend => friend.toString() === userId.toString()
    );
    if (friendExist) {
      return res.status(400).send();
    }

    // CHECK IF SENDING REQUEST TO HIS OWN ID
    if (friendId === userId.toString()) {
      return res.status(400).send();
    }

    friend.friendRequestsReceived.push(userId);
    await friend.save();
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const removeFriendRequestReceived = async (req, res, next) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).send();
    }

    // CHECK IF REQUEST ALREADY SENT
    const friendRequestAlreadyExist = friend.friendRequestsReceived.find(
      friend => friend.toString() === userId.toString()
    );
    if (!friendRequestAlreadyExist) {
      return res.status(400).send();
    }

    // CHECK IF SENDING REQUEST TO HIS OWN ID
    if (friendId === userId.toString()) {
      return res.status(400).send();
    }

    friend.friendRequestsReceived = friend.friendRequestsReceived.filter(
      friend => friend.toString() !== userId.toString()
    );
    await friend.save();
    next();
  } catch (e) {}
};

export const hasAuthorization = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).send();
    }
    next();
  } catch (e) {
    res.status(500).send(e);
  }
};
