import Note from '../models/notes';
import Department from '../models/department';
import Course from '../models/course.model';
import Subject from '../models/subject.model';

export const create = async (req, res) => {
  try {
    const department = await Department.findById(req.body.department);
    const course = await Course.findOne({
      _id: req.body.course,
      department: req.body.department,
    });
    const subject = await Subject.findOne({
      _id: req.body.subject,
      course: req.body.course,
      semester: req.body.semester,
    });

    if (!department || !course || !subject) {
      return res.status(400).send();
    }

    const note = new Note({...req.body, createdBy: req.user._id});
    await note.save();
    res.send(note);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const list = async (req, res) => {
  const {department, course, semester, subject} = req.query;
  let queryObject = {};

  if (department && course && semester && subject)
    queryObject = {department, course, semester, subject};
  else if (department && course && semester)
    queryObject = {department, course, semester};
  else if (department && course) queryObject = {department, course};
  else if (department) queryObject = {department};

  try {
  } catch (e) {}

  Note.find(queryObject)
    .then(docs => {
      res.status(200).send({notes: docs});
    })
    .catch(err => {
      console.log(err);
    });
};

const read = (req, res) => {
  const noteId = req.params.noteId;

  Note.findById(noteId)
    .populate('department', 'name')
    .populate('course', 'name')
    .populate('uploadedBy', 'name')
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

const addBookmark = (req, res) => {
  const userId = req.user._id;
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
  const userId = req.user._id;
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

export const getBookmarkedNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find({bookmarks: {$eq: userId}});
    res.send({notes});
  } catch (e) {
    res.status(400).send(e);
  }
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
