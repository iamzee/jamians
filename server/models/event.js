import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    rqeuired: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  poster: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  venue: {
    type: String,
    trim: true,
  },
  fee: {
    type: Number,
  },
  links: [
    {
      link: {
        type: String,
        trim: true,
        required: true,
      },
      title: {
        type: String,
        trim: true,
        required: true,
      },
    },
  ],
  contacts: [
    {
      name: {
        type: String,
        trim: true,
      },
      contactNumber: {
        type: Number,
        trim: true,
      },
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
