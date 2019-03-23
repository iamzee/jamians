import mongoose from 'mongoose';

const NoteSchema = mongoose.Schema ({
  name: {
    type: String,
  },
  topic: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  uploadedOn: {
    type: Date,
    default: Date.now (),
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  semester: {
    type: Number,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Note = mongoose.model ('Note', NoteSchema);

export default Note;
