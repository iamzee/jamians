import mongoose from 'mongoose';

const discussionSchema = mongoose.Schema ({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  status: {
    type: Boolean,
    required: true,
    default: true,
  },

  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  ],
});

const Discussion = mongoose.model ('Discussion', discussionSchema);

export default Discussion;
