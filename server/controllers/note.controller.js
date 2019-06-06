import Note from '../models/note.model';

const create = (req, res) => {
  new Note(req.body)
    .save()
    .then(doc => {
      res.status(200).send(doc);
    })
    .catch(err => {
      res.status(400).send({
        err,
        errorMessage: 'Unable to create Note',
      });
    });
};

const list = (req, res) => {
  const {department, course, semester, subject} = req.query;
  console.log('req.query', req.query);
  let queryObject = {};

  if (department && course && semester && subject)
    queryObject = {department, course, semester, subject};
  else if (department && course && semester)
    queryObject = {department, course, semester};
  else if (department && course) queryObject = {department, course};
  else if (department) queryObject = {department};

  console.log(queryObject);

  Note.find(queryObject)
    .then(docs => {
      res.status(200).json({notes: docs});
    })
    .catch(err => {
      console.log(err);
    });
};

const addBookmark = (req, res) => {
  const userId = req.body.userId;
  const noteId = req.body.noteId;

  Note.findById(noteId).then(note => {
    if (!note) {
      return res.status(400).json({
        errorMessage: 'Note not found',
      });
    }

    note.bookmarks.push(userId);

    note.save().then(doc => {
      res.json(doc);
    });
  });
};

const removeBookmark = (req, res) => {
  const userId = req.body.userId;
  const noteId = req.body.noteId;

  Note.findByIdAndUpdate(noteId, {$pull: {bookmarks: userId}}, {new: true})
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to update note',
      });
    });
};

const getBookmarkedNotes = (req, res) => {
  console.log(req.auth);
  const userId = req.auth._id;
  Note.find({bookmarks: {$eq: userId}}).then(docs => {
    res.status(200).json({
      notes: docs,
    });
  });
};

const read = (req, res) => {
  const noteId = req.params.noteId;

  Note.findById(noteId)
    .populate('department', 'name')
    .populate('course', 'name')
    .populate('uploadedBy', 'name')
    .populate('teacher', 'name')
    .populate('subject', 'name')
    .then(note => {
      if (!note) {
        return res.status(400).json({
          errorMessage: 'Note not found',
        });
      }

      res.status(200).json(note);
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to fetch note',
      });
    });
};

const count = (req, res) => {
  Note.count()
    .then(count => {
      res.status(200).json({count});
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to count notes.',
      });
    });
};

export default {
  create,
  list,
  addBookmark,
  removeBookmark,
  getBookmarkedNotes,
  read,
  count,
};
