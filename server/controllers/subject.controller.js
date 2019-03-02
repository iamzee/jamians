import mongoose from 'mongoose';
import Subject from '../models/subject.model';

const create = (req, res) => {
  new Subject (req.body)
    .save ()
    .then (doc => {
      res.status (200).send (doc);
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to save subject',
      });
    });
};

export default {create};
