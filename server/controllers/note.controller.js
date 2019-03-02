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
  let sortByObject = {};
  let searchByObject = {};

  const searchBy = req.query.searchBy;
  if (searchBy) {
    if (searchBy.teacher && searchBy.subject) {
      searchByObject = {teacher: searchBy.teacher, subject: searchBy.subject};
    } else if (searchBy.teacher) {
      searchByObject = {teacher: searchBy.teacher};
    } else if (searchBy.subject) {
      searchByObject = {subject: searchBy.subject};
    }
  }

  if (sortBy === 'time') {
    sortByObject = {uploadedOn: 'desc'};
  } else if (sortBy === 'downloads') {
    sortByObject = {downloads: 'desc'};
  }

  Note.find (searchByObject)
    .populate ('teacher')
    .populate ('subject')
    .sort (sortByObject)
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
