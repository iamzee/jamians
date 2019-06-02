import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
