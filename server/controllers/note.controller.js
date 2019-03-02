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
  const sortBy = req.query.sortBy;

  if (sortBy === 'time') {
    Note.find ({})
      .populate ('teacher')
      .populate ('subject')
      .sort ({uploadedOn: 'desc'})
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
  }

  // Note.find ({})
  //   .populate ('teacher')
  //   .populate ('subject')
  //   .then (docs => {
  //     res.status (200).send ({
  //       notes: docs,
  //     });
  //   })
  //   .catch (err => {
  //     res.status (400).send ({
  //       err,
  //       errorMessage: 'Unable to fetch notes',
  //     });
  //   });
};

export default {
  create,
  list,
};
