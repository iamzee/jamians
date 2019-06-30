import mongoose from 'mongoose';

const eventDiscussionSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});

const EventDiscussion = mongoose.model(
  'EventDiscussion',
  eventDiscussionSchema
);

export default EventDiscussion;
