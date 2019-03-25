import User from '../models/user.model';
import jwt from 'jsonwebtoken';

export const create = (req, res) => {
  new User (req.body)
    .save ()
    .then (doc => {
      jwt.sign (
        {
          _id: doc._id,
        },
        process.env.JWT_SECRET,
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
      let errorMessage = 'Unable to create User';

      if (err.errors) {
        if (err.errors.password) {
          if (err.errors.password.kind === 'minlength') {
            errorMessage = 'Password should be atleast 6 characters long!';
          }
        }
      } else if (err.code === 11000) {
        errorMessage = 'Email already exist!';
      }
      res.status (400).json ({
        errorMessage,
      });
    });
};

export const userById = (req, res, next, id) => {
  User.findById (id)
    .populate ({
      path: 'department',
      populate: {
        path: 'courses',
        select: '_id name',
      },
    })
    .populate ({
      path: 'department',
      populate: {
        path: 'teachers',
        select: '_id name',
      },
    })
    .populate ({
      path: 'course',
      populate: {
        path: 'subjects',
        select: '_id name',
      },
    })
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

export const count = (req, res) => {
  User.count ()
    .then (count => {
      res.status (200).json ({count});
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to get count',
      });
    });
};
