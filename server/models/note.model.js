const mongoose = require ('mongoose');
const Teacher = require ('./teacher.model');
const Subject = require ('./subject.model');

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
});

const Note = mongoose.model ('Note', NoteSchema);

module.exports = Note;
