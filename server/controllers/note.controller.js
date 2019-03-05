import Note from '../models/note.model';

const create = (req, res) => {
  new Note (req.body)
    .save ()
    .then (doc => {
      res.status (200).send (doc);
    })
    .catch (err => {
      exports.status (400).send ({
        err,
        errorMessage: 'Unable to create Note',
      });
    });
};

const list = (req, res) => {
  let searchByObject = {};

  const searchBySubject = req.query.subject;

  if (searchBySubject) {
    searchByObject = {
      subject: searchBySubject,
    };
  }

  Note.find (searchByObject)
    .populate ('teacher')
    .populate ('subject')
    .then (doc => {
      res.status (200).send ({
        notes: doc,
      });
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to fetch Notes',
      });
    });
};

export default {
  create,
  list,
};
