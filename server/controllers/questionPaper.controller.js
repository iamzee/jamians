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
