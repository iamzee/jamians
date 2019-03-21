import mongoose from 'mongoose';

const DepartmentSchema = mongoose.Schema ({
  name: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

const Department = mongoose.model ('Department', DepartmentSchema);

export default Department;
