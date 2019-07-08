import Notification from '../models/notification';
import User from '../models/user';

export const create = async (req, res) => {
  try {
    const user = await User.findById (req.body.user);

    if (!user) {
      return res.status (400).send ();
    }

    const isFriend = req.user.friends.find (
      friend => friend.toString () === req.body.user.toString ()
    );

    if (!isFriend) {
      return res.status (400).send ();
    }

    const notification = new Notification ({
      ...req.body,
      createdBy: req.user._id,
    });
    await notification.save ();
    res.send (notification);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const update = async (req, res) => {
  console.log ('HI');
  try {
    console.log (req.user._id.toString ());
    const notification = await Notification.findOneAndUpdate (
      {_id: req.params.id, user: req.user._id.toString ()},
      {$set: {seen: true}},
      {new: true}
    );

    if (!notification) {
      console.log ('NOT FOUBD');
      return res.status (400).send ();
    }

    res.send (notification);
  } catch (e) {
    console.log (e);
    res.status (400).send (e);
  }
};
