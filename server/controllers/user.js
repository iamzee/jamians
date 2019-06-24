import User from '../models/user';

export const create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.send(400).send(e);
  }
};
