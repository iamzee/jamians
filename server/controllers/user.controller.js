import User from '../models/user.model';

const create = (req, res) => {
  new User (req.body)
    .save ()
    .then (doc => {
      res.status (200).send (doc);
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to create User',
      });
    });
};

export default {create};
