import QuestionPaper from '../models/questionPaper';
import Department from '../models/department';
import Course from '../models/course';
import Subject from '../models/subject';

export const create = async (req, res) => {
  try {
    const {department, course, subject, semester} = req.query;
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

    const questionPaper = new QuestionPaper ({
      ...req.body,
      createdBy: req.user._id,
      department,
      course,
      subject,
      semester,
    });
    await questionPaper.save ();
    res.send (questionPaper);
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
    const questionPapers = await QuestionPaper.find (queryObject).sort (
      '-year'
    );
    res.send ({questionPapers});
  } catch (e) {
    res.status (500).send (e);
  }
};

export const read = async (req, res) => {
  const {id} = req.params;

  try {
    const questionPaper = await QuestionPaper.findById (id)
      .populate ('department', 'name')
      .populate ('course', 'name')
      .populate ('createdBy', 'name')
      .populate ('subject', 'name');

    if (!questionPaper) {
      return res.status (404).send ();
    }

    res.send (questionPaper);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const addBookmark = async (req, res) => {
  const userId = req.user._id;
  const {id} = req.params;

  try {
    const alreadyBookmarked = await QuestionPaper.findOne ({
      _id: id,
      bookmarks: {$eq: userId},
    });

    if (alreadyBookmarked) {
      return res.status (400).send ();
    }

    const questionPaper = await QuestionPaper.findByIdAndUpdate (
      id,
      {$push: {bookmarks: userId}},
      {new: true}
    );
    if (!questionPaper) {
      res.status (404).send ();
    }
    res.send (questionPaper);
  } catch (e) {
    res.status (400).send (e);
  }
};

export const removeBookmark = async (req, res) => {
  const userId = req.user._id;
  const {id} = req.params;

  try {
    const alreadyBookmarked = await QuestionPaper.findOne ({
      _id: id,
      bookmarks: {$eq: userId},
    });

    if (!alreadyBookmarked) {
      return res.status (400).send ();
    }

    const questionPaper = await QuestionPaper.findByIdAndUpdate (
      id,
      {$pull: {bookmarks: userId}},
      {new: true}
    );
    if (!questionPaper) {
      res.status (404).send ();
    }
    res.send (questionPaper);
  } catch (e) {
    res.status (400).send (e);
  }
};
