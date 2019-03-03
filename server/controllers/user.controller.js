import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

const create = (req, res) => {
  new User (req.body)
    .save ()
    .then (doc => {
      jwt.sign (
        {
          _id: doc._id,
        },
        config.jwtSecret,
        function (err, token) {
          if (err) {
            return res.status (400).json ({
              err,
              errorMessage: 'Unable to create account',
            });
          }
          res.status (200).json ({
            token,
            user: doc,
          });
        }
      );
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Unable to create User',
      });
    });
};

export default {create};
