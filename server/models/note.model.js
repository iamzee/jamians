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
    ref: 'user',
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
  downloads: {
    type: Number,
    default: 0,
  },
});

const Note = mongoose.model ('Note', NoteSchema);

export default Note;
