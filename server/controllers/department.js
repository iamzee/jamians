import Department from '../models/department';

export const create = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.send(department);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const list = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.send({departments});
  } catch (e) {
    res.status(500).send(e);
  }
};

export const read = async (req, res) => {
  const {id} = req.params;

  try {
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).send();
    }

    res.send(department);
  } catch (e) {
    res.status(400).send(e);
  }
};
