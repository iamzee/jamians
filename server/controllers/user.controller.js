import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

export const create = (req, res) => {
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

export const userById = (req, res, next, id) => {
  User.findById (id)
    .then (user => {
      if (!user) {
        return res.status (400).json ({
          errorMessage: 'User not found',
        });
      }

      req.profile = user;
      next ();
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to read User',
      });
    });
};

export const read = (req, res) => {
  res.status (200).json (req.profile);
};
