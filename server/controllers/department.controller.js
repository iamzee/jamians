import Department from '../models/department.model';

export const create = (req, res) => {
  new Department (req.body).save ().then (doc => {
    res.status (200).json (doc);
  });
};

export const list = (req, res) => {
  Department.find ({})
    .then (docs => {
      res.status (200).json ({
        departments: docs,
      });
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to fetch departments',
      });
    });
};

export const read = (req, res) => {
  const {departmentId} = req.params;

  Department.findById (departmentId)
    .populate ('courses', '_id name')
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

  const {type, courseId, teacherId} = req.body;

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
            errorMessage: 'Unable to add course!',
          });
        });
    }

    case 'REMOVE_COURSE': {
      return Department.findByIdAndUpdate (
        departmentId,
        {$pull: {courses: courseId}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to remove course!',
          });
        });
    }

    case 'ADD_TEACHER': {
      return Department.findByIdAndUpdate (
        departmentId,
        {$push: {teachers: teacherId}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to add teacher!',
          });
        });
    }

    case 'REMOVE_TEACHER': {
      return Department.findByIdAndUpdate (
        departmentId,
        {$pull: {teachers: teacherId}},
        {new: true}
      )
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to add teacher!',
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
