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

export const read = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
