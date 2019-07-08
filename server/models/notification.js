import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema (
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Notification = mongoose.model ('Notification', notificationSchema);

export default Notification;
