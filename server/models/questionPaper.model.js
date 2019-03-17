import mongoose from 'mongoose';

const questionPaperSchema = mongoose.Schema ({
  name: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  semester: {
    type: Number,
  },
  year: {
    type: String,
  },
  uploadedOn: {
    type: Date,
    default: Date.now (),
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const QuestionPaper = mongoose.model ('QuestionPaper', questionPaperSchema);

export default QuestionPaper;
