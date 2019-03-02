import mongoose from 'mongoose';
const TeacherSchema = mongoose.Schema ({
  name: {
    type: String,
    required: 'Nmae is required',
    trim: true,
  },
});

const Teacher = mongoose.model ('Teacher', TeacherSchema);

export default Teacher;
