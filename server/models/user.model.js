import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

const UserSchema = mongoose.Schema ({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    required: 'Email is required',
    validate: {
      validator: function (v) {
        return validator.isEmail (v);
      },
      message: props => `${props.value} is not a valid email`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now (),
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
  },
});

UserSchema.pre ('save', function (next) {
  const user = this;

  if (user.isModified ('password')) {
    bcrypt.genSalt (10, function (err, salt) {
      bcrypt.hash (user.password, salt, function (err, hash) {
        user.password = hash;
        next ();
      });
    });
  }
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject ();

  return _.pick (userObject, ['name', 'email', 'createdAt', '_id']);
};

const User = mongoose.model ('User', UserSchema);

export default User;
