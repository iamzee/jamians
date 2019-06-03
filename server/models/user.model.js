import mongoose from 'mongoose';

const UserSchema = mongoose.Schema ({
  googleID: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now (),
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
});

const User = mongoose.model ('User', UserSchema);

export default User;
