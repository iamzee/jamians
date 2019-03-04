import mongoose from 'mongoose';
import Teacher from '../models/teacher.model';

const create = (req, res) => {
  new Teacher (req.body)
    .save ()
    .then (doc => {
      res.status (200).send (doc);
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to save Teacher',
      });
    });
};

const list = (req, res) => {
  Teacher.find ({})
    .then (docs => {
      res.status (200).send ({
        teachers: docs,
      });
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to fetch Users',
      });
    });
};

export default {
  create,
  list,
};
