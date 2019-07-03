import Subject from '../models/subject';

export const create = async (req, res) => {
  const {course, semester} = req.query;

  if (!course || !semester) {
    return res.status(400).send();
  }

  try {
    const subject = new Subject({name: req.body.name, course, semester});
    await subject.save();
    res.send(subject);
  } catch (e) {
    res.status(400).send();
  }
};

export const list = async (req, res) => {
  const {course, semester} = req.query;

  if (!course || !semester) {
    return res.status(400).send();
  }

  try {
    const subjects = await Subject.find({course, semester});
    res.send({subjects});
  } catch (e) {
    res.status(500).send(e);
  }
};
