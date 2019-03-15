import mongoose from 'mongoose';

const DepartmentSchema = mongoose.Schema ({
  name: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

const Department = mongoose.model ('Department', DepartmentSchema);

export default Department;
