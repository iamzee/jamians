import jwt from 'jsonwebtoken';
import User from '../models/user';

export default async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'abc123');
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send({error: 'Please authenticate.'});
  }
};
