import mongoose from 'mongoose';

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

const EventDiscussion = mongoose.model (
  'EventDiscussion',
  eventDiscussionSchema
);

export default EventDiscussion;
