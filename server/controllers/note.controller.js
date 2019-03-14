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

const addBookmark = (req, res) => {
  const userId = req.body.userId;
  const noteId = req.body.noteId;

  Note.findById (noteId).then (note => {
    if (!note) {
      return res.status (400).json ({
        errorMessage: 'Note not found',
      });
    }

    note.bookmarks.push (userId);

    note.save ().then (doc => {
      res.json (doc);
    });
  });
};

const removeBookmark = (req, res) => {
  const userId = req.body.userId;
  const noteId = req.body.noteId;

  Note.findByIdAndUpdate (noteId, {$pull: {bookmarks: userId}}, {new: true})
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to update note',
      });
    });
};

const getBookmarkedNotes = (req, res) => {
  const userId = req.auth._id;
  Note.find ({bookmarks: {$eq: userId}}).then (docs => {
    res.status (200).json ({
      notes: docs,
    });
  });
};

export default {
  create,
  list,
  addBookmark,
  removeBookmark,
  getBookmarkedNotes,
};
