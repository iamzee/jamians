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
