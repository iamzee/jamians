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
