import User from '../models/user';

export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken();

    res.send({token, user});
  } catch (e) {
    res.status(400).send({error: e.message});
  }
};
