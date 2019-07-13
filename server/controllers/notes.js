import Note from '../models/notes';
import Department from '../models/department';
import Course from '../models/course';
import Subject from '../models/subject';
import formidable from 'formidable';
import {upload} from '../azure/blob';
import uuid from 'uuid/v1';

export const create = async (req, res) => {
  try {
    let form = new formidable.IncomingForm ();
    form.keepExtensions = true;
    form.maxFileSize = 200 * 1024 * 1024;

    form.parse (req, async (err, fields, files) => {
      if (err) {
        return res.status (400).send (e);
      }

      if (files.name.type !== 'application/pdf') {
        return res.status (400).send ({error: 'Invalid file type.'});
      }

      const {
        topic,
        description,
        department,
        course,
        subject,
        semester,
      } = fields;

      const d = await Department.findById (department);
      const c = await Course.findOne ({
        _id: course,
        department: department,
      });
      const s = await Subject.findOne ({
        _id: subject,
        course: course,
        semester: semester,
      });

      if (!d || !c || !s) {
        return res.status (400).send ();
      }

      const blob = `${uuid ()}.pdf`;
      await upload ('notes', blob, files.name.path);

      const note = new Note ({
        name: blob,
        topic,
        description,
        createdBy: req.user._id,
        department,
        course,
        subject,
        semester,
      });

      await note.save ();
      res.send (note);
    });
  } catch (e) {
    console.log (e);
    res.status (400).send (e);
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

  Note.find (queryObject)
    .then (docs => {
      res.status (200).send ({notes: docs});
    })
    .catch (err => {
      console.log (err);
    });
};

export const read = async (req, res) => {
  const {id} = req.params;

  try {
    const note = await Note.findById (id)
      .populate ('department', 'name')
      .populate ('course', 'name')
      .populate ('createdBy', 'name')
      .populate ('subject', 'name');

    if (!note) {
      return res.status (404).send ();
    }

    res.send (note);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const remove = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    const note = await Note.findOneAndDelete ({
      _id: noteId,
      createdBy: userId,
    });

    if (!note) {
      return res.status (404).send ();
    }

    res.send (note);
  } catch (e) {
    console.log (e);
    res.status (500).send (e);
  }
};

export const addBookmark = async (req, res) => {
  const userId = req.user._id;
  const {id} = req.params;

  try {
    const alreadyBookmarked = await Note.findOne ({
      _id: id,
      bookmarks: {$eq: userId},
    });

    if (alreadyBookmarked) {
      return res.status (400).send ();
    }

    const note = await Note.findByIdAndUpdate (
      id,
      {$push: {bookmarks: userId}},
      {new: true}
    );
    if (!note) {
      res.status (404).send ();
    }
    res.send (note);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const removeBookmark = async (req, res) => {
  const userId = req.user._id;
  const {id} = req.params;

  try {
    const alreadyBookmarked = await Note.findOne ({
      _id: id,
      bookmarks: {$eq: userId},
    });

    if (!alreadyBookmarked) {
      return res.status (400).send ();
    }

    const note = await Note.findByIdAndUpdate (
      id,
      {$pull: {bookmarks: userId}},
      {new: true}
    );
    if (!note) {
      res.status (404).send ();
    }
    res.send (note);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const getBookmarkedNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find ({bookmarks: {$eq: userId}});
    res.send ({notes});
  } catch (e) {
    res.status (400).send (e);
  }
};
