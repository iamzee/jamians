import mongoose from 'mongoose';

const DepartmentSchema = mongoose.Schema ({
  name: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
});

const Department = mongoose.model ('Department', DepartmentSchema);

export default Department;
