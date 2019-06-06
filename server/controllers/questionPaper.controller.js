import QuestionPaper from '../models/questionPaper.model';

export const create = (req, res) => {
  new QuestionPaper(req.body)
    .save()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to create questionPaper',
      });
    });
};

export const list = (req, res) => {
  const {department, course, semester, subject} = req.query;
  let queryObject = {};

  if (department && course && semester && subject)
    queryObject = {department, course, semester, subject};
  else if (department && course && semester)
    queryObject = {department, course, semester};
  else if (department && course) queryObject = {department, course};
  else if (department) queryObject = {department};

  QuestionPaper.find(queryObject)
    .then(docs => {
      res.status(200).json({
        questionPapers: docs,
      });
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to fetch question papers',
      });
    });
};

export const read = (req, res) => {
  const {questionPaperId} = req.params;

  QuestionPaper.findById(questionPaperId)
    .populate('department', 'name')
    .populate('course', 'name')
    .populate('subject', 'name')
    .populate('uploadedBy', 'name')
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to fetch Question Paper',
      });
    });
};

export const update = (req, res) => {
  const {type} = req.body;
  const {user} = req;
  const {questionPaperId} = req.params;

  switch (type) {
    case 'ADD_BOOKMARK': {
      return QuestionPaper.findByIdAndUpdate(
        questionPaperId,
        {$push: {bookmarks: user._id}},
        {new: true}
      )
        .then(doc => {
          res.status(200).json(doc);
        })
        .catch(err => {
          res.status(400).json({
            err,
            errorMessage: 'Unable to update question paper!',
          });
        });
    }
    case 'REMOVE_BOOKMARK': {
      return QuestionPaper.findByIdAndUpdate(
        questionPaperId,
        {$pull: {bookmarks: user._id}},
        {new: true}
      )
        .then(doc => {
          res.status(200).json(doc);
        })
        .catch(err => {
          res.status(400).json({
            err,
            errorMessage: 'Unable to update question paper!',
          });
        });
    }
    default: {
      return res.status(400).json({
        errorMessage: 'Invalid action type!',
      });
    }
  }
};

export const listBookmarks = (req, res) => {
  const user = req.user;

  QuestionPaper.find({bookmarks: {$eq: user._id}})
    .populate('department', 'name')
    .populate('subject', 'name')
    .populate('uploadedBy', 'name')
    .then(docs => {
      res.status(200).json({
        questionPapers: docs,
      });
    })
    .catch(err => {
      res.status(400).json({
        err,
        errorMessage: 'Unable to list bookmarked question papers',
      });
    });
};

export const count = (req, res) => {
  QuestionPaper.count()
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
