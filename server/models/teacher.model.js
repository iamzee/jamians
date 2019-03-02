const mongoose = require ('mongoose');

const TeacherSchema = mongoose.Schema ({
  name: {
    type: String,
    required: 'Nmae is required',
    trim: true,
  },
});

const Teacher = mongoose.model ('Teacher', TeacherSchema);

module.exports = Teacher;
