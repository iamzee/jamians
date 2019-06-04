import mongoose from 'mongoose';

const SubjectSchema = mongoose.Schema ({
  name: {
    type: String,
    require: 'Name is required',
    trim: true,
  },
  semester: {
    type: Number,
    required: 'Semester is required',
  },
});

const Subject = mongoose.model ('Subject', SubjectSchema);

export default Subject;
