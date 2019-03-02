import mongoose from 'mongoose';

const SubjectSchema = mongoose.Schema ({
  name: {
    type: String,
    require: 'Name is required',
    trim: true,
  },
});

const Subject = mongoose.model ('Subject', SubjectSchema);

export default Subject;
