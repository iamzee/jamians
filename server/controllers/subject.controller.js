import Subject from '../models/subject.model';

const create = (req, res) => {
  new Subject (req.body)
    .save ()
    .then (doc => {
      res.status (200).send (doc);
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to save subject',
      });
    });
};

const list = (req, res) => {
  const {course, semester} = req.query;

  if (!course || !semester) {
    return res.status (400).json ({
      errorMessage: 'Bad Request. Course and Semester query fields are required.',
    });
  }

  Subject.find ({course, semester}).then (subjects => {
    res.status (200).json ({subjects});
  });
};

export default {create, list};
