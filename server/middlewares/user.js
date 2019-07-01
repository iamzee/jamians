import User from '../models/user';

export const addFriendRequestReceived = async (req, res, next) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    // CHECK IF FRIEND EXISTS
    const friend = await User.findById (friendId);
    if (!friend) {
      return res.status (404).send ();
    }

    // CHECK IF REQUEST ALREADY SENT
    const friendRequestAlreadyExist = friend.friendRequestsReceived.find (
      friend => friend.toString () === userId.toString ()
    );
    if (friendRequestAlreadyExist) {
      return res.status (400).send ();
    }

    // CHECK IF ALREADY A FRIEND
    const friendExist = friend.friends.find (
      friend => friend.toString () === userId.toString ()
    );
    if (friendExist) {
      return res.status (400).send ();
    }

    // CHECK IF SENDING REQUEST TO HIS OWN ID
    if (friendId === userId.toString ()) {
      return res.status (400).send ();
    }

    friend.friendRequestsReceived.push (userId);
    await friend.save ();
    next ();
  } catch (e) {
    res.status (400).send (e);
  }
};

// export const addFollower = async (req, res, next) => {
//   const userToFollowId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const matchedUser = await User.findById (userToFollowId);
//     if (!matchedUser) {
//       return res.status (404).send ();
//     }

//     const followerAlreadyExist = matchedUser.followers.find (
//       follower => follower.toString () === userId.toString ()
//     );

//     if (followerAlreadyExist) {
//       return res.status (400).send ();
//     }

//     if (userToFollowId === userId.toString ()) {
//       return res.status (400).send (e);
//     }

//     matchedUser.followers.push (userId);
//     await matchedUser.save ();
//     next ();
//   } catch (e) {
//     res.status (400).send (e);
//   }
// };

export const removeFriendRequestReceived = async (req, res, next) => {
  const friendId = req.params.id;
  const userId = req.user._id;

  try {
    const friend = await User.findById (friendId);
    if (!friend) {
      return res.status (404).send ();
    }

    // CHECK IF REQUEST ALREADY SENT
    const friendRequestAlreadyExist = friend.friendRequestsReceived.find (
      friend => friend.toString () === userId.toString ()
    );
    if (!friendRequestAlreadyExist) {
      return res.status (400).send ();
    }

    // CHECK IF SENDING REQUEST TO HIS OWN ID
    if (friendId === userId.toString ()) {
      return res.status (400).send ();
    }

    friend.friendRequestsReceived = friend.friendRequestsReceived.filter (
      friend => friend.toString () !== userId.toString ()
    );
    await friend.save ();
    next ();
  } catch (e) {}
};

// export const removeFollower = async (req, res, next) => {
//   const userToFollowId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const matchedUser = await User.findById (userToFollowId);
//     if (!matchedUser) {
//       return res.status (404).send ();
//     }

//     const followerAlreadyExist = matchedUser.followers.find (
//       follower => follower.toString () === userId.toString ()
//     );

//     if (!followerAlreadyExist) {
//       return res.status (404).send ();
//     }

//     if (userToFollowId === userId.toString ()) {
//       return res.status (400).send (e);
//     }

//     matchedUser.followers = matchedUser.followers.filter (
//       follower => follower.toString () !== userId.toString ()
//     );
//     await matchedUser.save ();
//     next ();
//   } catch (e) {
//     res.status (400).send (e);
//   }
// };
