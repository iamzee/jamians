const mongoose = require ('mongoose');
const Teacher = require ('../models/teacher.model');

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

module.exports = {
  create,
};
