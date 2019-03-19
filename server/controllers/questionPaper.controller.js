import QuestionPaper from '../models/questionPaper.model';

export const create = (req, res) => {
  new QuestionPaper (req.body)
    .save ()
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to create questionPaper',
      });
    });
};

export const list = (req, res) => {
  const {department, semester, subject} = req.query;
  let queryObject = {department};

  if (subject && semester) {
    queryObject = {
      department,
      subject,
      semester,
    };
  } else if (subject) {
    queryObject = {
      department,
      subject,
    };
  } else if (semester) {
    queryObject = {
      department,
      semester,
    };
  }

  QuestionPaper.find (queryObject)
    .then (docs => {
      res.status (200).json ({
        questionPapers: docs,
      });
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to fetch notes',
      });
    });
};

export const read = (req, res) => {
  const {questionPaperId} = req.params;

  QuestionPaper.findById (questionPaperId)
    .populate ('department', 'name')
    .populate ('subject', 'name')
    .populate ('uploadedBy', 'name')
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to fetch Question Paper',
      });
    });
};

export const update = (req, res) => {
  const {type, data} = req.body;
  const {questionPaperId} = req.params;

  switch (type) {
    case 'ADD_BOOKMARK': {
      return QuestionPaper.findByIdAndUpdate (
        questionPaperId,
        {$push: {bookmarks: data.userId}},
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
        {$pull: {bookmarks: data.userId}},
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
  const user = req.auth;

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
