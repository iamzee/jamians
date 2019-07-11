import mongoose from 'mongoose';
import validator from 'validator';

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

const eventSchema = mongoose.Schema(
  {
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
    going: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    registration: {
      type: String,
    },
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        replies: [
          {
            text: String,
            createdAt: {
              type: Date,
              default: Date.now,
            },
            createdBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
