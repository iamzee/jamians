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

export const addSubject = (req, res) => {
  const departmentId = req.body.departmentId;
  const subjectId = req.body.subjectId;

  Department.findByIdAndUpdate (
    departmentId,
    {$push: {subjects: subjectId}},
    {new: true}
  )
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to add subject to the department!',
      });
    });
};

export const read = (req, res) => {
  const {departmentId} = req.params;
  console.log (departmentId);

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
