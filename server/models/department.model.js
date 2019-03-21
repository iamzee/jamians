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
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
});

const Department = mongoose.model ('Department', DepartmentSchema);

export default Department;
