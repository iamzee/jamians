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
  Subject.find ({})
    .then (docs => {
      res.status (200).json ({
        subjects: docs,
      });
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to fetch subjects',
      });
    });
};

export default {create, list};
