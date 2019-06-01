import mongoose from 'mongoose';

const ChatSchema = mongoose.Schema ({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now (),
  },

  text: {
    type: String,
    required: true,
    trim: true,
  },
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
