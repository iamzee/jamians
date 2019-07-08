import mongoose from 'mongoose';

const eventDiscussionCommentSchema = mongoose.Schema (
  {
    text: {
      type: String,
      required: true,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventDiscussion',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const EventDiscussionComment = mongoose.model (
  'EventDiscussionComment',
  eventDiscussionCommentSchema
);

export default EventDiscussionComment;
