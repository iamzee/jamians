import User from '../models/user';
import _ from 'lodash';

export const login = async (req, res) => {
  try {
    const data = _.pick(req.body, ['email', 'password']);

    const user = await User.findByCredentials(data.email, data.password);

    const token = await user.generateToken();

    res.send({token, user});
  } catch (e) {
    res.status(400).send({error: e.message});
  }
};
