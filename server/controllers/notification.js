import Notification from '../models/notification';
import User from '../models/user';

export const create = async (req, res) => {
  try {
    const user = await User.findById (req.body.user);

    if (!user) {
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

export const list = async (req, res) => {
  try {
    const notifications = await Notification.find ({user: req.user._id}).sort (
      '-createdAt'
    );
    res.send ({notifications});
  } catch (e) {
    res.status (500).send (e);
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

export const count = async (req, res) => {
  try {
    const count = await Notification.count ({user: req.user._id, seen: false});
    res.send ({count});
  } catch (e) {
    res.status (500).send (e);
  }
};
