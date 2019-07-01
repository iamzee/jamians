import User from '../models/user';

export const addFollower = async (req, res, next) => {
  const userToFollowId = req.params.id;
  const userId = req.user._id;

  try {
    const matchedUser = await User.findById (userToFollowId);
    if (!matchedUser) {
      return res.status (404).send ();
    }

    const followerAlreadyExist = matchedUser.followers.find (
      follower => follower.toString () === userId.toString ()
    );

    if (followerAlreadyExist) {
      return res.status (400).send ();
    }

    if (userToFollowId === userId.toString ()) {
      return res.status (400).send (e);
    }

    matchedUser.followers.push (userId);
    await matchedUser.save ();
    next ();
  } catch (e) {
    res.status (400).send (e);
  }
};

export const removeFollower = async (req, res, next) => {
  const userToFollowId = req.params.id;
  const userId = req.user._id;

  try {
    const matchedUser = await User.findById (userToFollowId);
    if (!matchedUser) {
      return res.status (404).send ();
    }

    const followerAlreadyExist = matchedUser.followers.find (
      follower => follower.toString () === userId.toString ()
    );

    if (!followerAlreadyExist) {
      return res.status (404).send ();
    }

    if (userToFollowId === userId.toString ()) {
      return res.status (400).send (e);
    }

    matchedUser.followers = matchedUser.followers.filter (
      follower => follower.toString () !== userId.toString ()
    );
    await matchedUser.save ();
    next ();
  } catch (e) {
    res.status (400).send (e);
  }
};
