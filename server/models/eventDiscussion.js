import mongoose from 'mongoose';

import User from '../models/user';
import Event from '../models/event';
import Notification from '../models/notification';

const eventDiscussionSchema = mongoose.Schema (
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  {
    timestamps: true,
  }
);

eventDiscussionSchema.post ('save', async function (doc, next) {
  next ();
  const user = await User.findById (doc.createdBy);
  const event = await Event.findById (doc.event);

  const notification = {
    message: `${user.name} commented on the event you created.`,
    user: event.createdBy,
    link: `/events/${event._id}`,
    createdBy: doc.createdBy,
  };

  const n = new Notification (notification);
  await n.save ();
});

const EventDiscussion = mongoose.model (
  'EventDiscussion',
  eventDiscussionSchema
);

export default EventDiscussion;
