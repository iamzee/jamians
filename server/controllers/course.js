import Course from '../models/course';

export const create = async (req, res) => {
  const {department} = req.query;

  if (!department) {
    return res.status(400).send();
  }

  try {
    const course = new Course({name: req.body.name, department});
    await course.save();
    res.send(course);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const read = async (req, res) => {
  const {id} = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).send();
    }

    res.send(course);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const list = async (req, res) => {
  const {department} = req.query;

  if (!department) {
    return res.status(400).send();
  }

  try {
    const courses = await Course.find({department});
    res.status(200).send({courses});
  } catch (e) {
    res.status(500).send();
  }
};
