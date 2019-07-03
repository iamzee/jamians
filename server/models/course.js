import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
