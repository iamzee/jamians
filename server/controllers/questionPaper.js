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

export const update = (req, res) => {
  const {type} = req.body;
  const {user} = req;
  const {questionPaperId} = req.params;

  switch (type) {
    case 'ADD_BOOKMARK': {
      return QuestionPaper.findByIdAndUpdate (
        questionPaperId,
        {$push: {bookmarks: user._id}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to update question paper!',
          });
        });
    }
    case 'REMOVE_BOOKMARK': {
      return QuestionPaper.findByIdAndUpdate (
        questionPaperId,
        {$pull: {bookmarks: user._id}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to update question paper!',
          });
        });
    }
    default: {
      return res.status (400).json ({
        errorMessage: 'Invalid action type!',
      });
    }
  }
};

export const listBookmarks = (req, res) => {
  const user = req.user;

  QuestionPaper.find ({bookmarks: {$eq: user._id}})
    .populate ('department', 'name')
    .populate ('subject', 'name')
    .populate ('uploadedBy', 'name')
    .then (docs => {
      res.status (200).json ({
        questionPapers: docs,
      });
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to list bookmarked question papers',
      });
    });
};

export const count = (req, res) => {
  QuestionPaper.count ()
    .then (count => {
      res.status (200).json ({count});
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to count notes.',
      });
    });
};
