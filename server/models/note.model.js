import mongoose from 'mongoose';

const NoteSchema = mongoose.Schema ({
  topic: {
    type: String,
    required: 'Topic is required',
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  note_url: {
    type: String,
    required: 'Note URL is required',
    trim: true,
  },
  uploadedOn: {
    type: Date,
    required: true,
    default: Date.now (),
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  downloads: {
    type: Number,
    default: 0,
  },
});

const Note = mongoose.model ('Note', NoteSchema);

export default Note;
