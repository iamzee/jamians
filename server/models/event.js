import mongoose from 'mongoose';

const eventCategory = [
  'Art',
  'Causes',
  'Coding',
  'Comedy',
  'Crafts',
  'Dance',
  'Education',
  'Film',
  'Fitness',
  'Food',
  'Games',
  'Health',
  'Literature',
  'Music',
  'Networking',
  'Party',
  'Religion',
  'Shopping',
  'Sports',
  'Other',
];

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  category: {
    type: 'String',
    required: true,
    validate: {
      validator: function(v) {
        return eventCategory.includes(v);
      },
      message: props => `${props.value} is not a valid event category.`,
    },
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
  going: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
