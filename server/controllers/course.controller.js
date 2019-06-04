import Course from '../models/course.model';

export const create = (req, res) => {
  new Course (req.body)
    .save ()
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to create course',
      });
    });
};

export const read = (req, res) => {
  const {courseId} = req.params;

  Course.findById (courseId)
    .populate ({
      path: 'subjects',
      select: '_id name semester',
    })
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to read course',
      });
    });
};

export const update = (req, res) => {
  const {courseId} = req.params;

  const {type, subjectId} = req.body;

  switch (type) {
    case 'ADD_SUBJECT': {
      return Course.findByIdAndUpdate (
        courseId,
        {$push: {subjects: subjectId}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to add subject!',
          });
        });
    }

    case 'REMOVE_SUBJECT': {
      return Course.findByIdAndUpdate (
        courseId,
        {$pull: {subjects: subjectId}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to remove subject!',
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
