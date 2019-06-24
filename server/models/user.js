import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateToken = async function() {
  const user = this;

  const token = jwt.sign({_id: user._id.toString()}, 'abc123');
  user.tokens = user.tokens.concat({token});
  console.log(user);
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error('Unable to login.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login.');
  }

  return user;
};

// HASH PLAIN PASSWORD BEFORE SAVING
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
