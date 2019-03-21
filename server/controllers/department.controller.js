import Department from '../models/department.model';

export const create = (req, res) => {
  new Department (req.body).save ().then (doc => {
    res.status (200).json (doc);
  });
};

export const list = (req, res) => {
  Department.find ({}).then (docs => {
    res.status (200).json ({
      departments: docs,
    });
  });
};

export const read = (req, res) => {
  const {departmentId} = req.params;

  Department.findById (departmentId)
    .populate ('subjects')
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to read department',
      });
    });
};

export const update = (req, res) => {
  const {departmentId} = req.params;

  const {type, courseId} = req.body;

  switch (type) {
    case 'ADD_COURSE': {
      return Department.findByIdAndUpdate (
        departmentId,
        {$push: {courses: courseId}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to update department!',
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
