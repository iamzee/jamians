import mongoose from 'mongoose';

const courseSchema = mongoose.Schema ({
  name: {
    type: String,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

const Course = mongoose.model ('Course', courseSchema);

export default Course;
