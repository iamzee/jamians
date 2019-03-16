import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import expressJwt from 'express-jwt';

const login = (req, res) => {
  User.findOne ({
    email: req.body.email,
  })
    .populate ({
      path: 'department',
      populate: {
        path: 'subjects',
      },
    })
    .then (doc => {
      if (!doc) {
        return res.status (400).send ({
          errorMessage: 'User not found!!',
        });
      }

      bcrypt.compare (req.body.password, doc.password, function (err, result) {
        if (result) {
          jwt.sign (
            {
              _id: doc._id,
            },
            config.jwtSecret,
            function (err, token) {
              if (err) {
                return res.status (400).json ({
                  err,
                  errorMessage: 'Unable to authenticate',
                });
              }
              res.status (200).json ({
                token,
                user: doc,
              });
            }
          );
        } else {
          res.status (400).json ({
            errorMessage: 'Password Incorrect!!',
          });
        }
      });
    })
    .catch (err => {
      res.status (400).send ({
        err,
        errorMessage: 'Cant find User',
      });
    });
};

const logout = () => {
  res.status (200).json ({
    message: 'User logged out.',
  });
};

const requireSignin = expressJwt ({
  secret: config.jwtSecret,
  requestProperty: 'auth',
});

const currentUser = (req, res) => {
  res.status (200).json (req.auth);
};

export default {
  login,
  logout,
  requireSignin,
  currentUser,
};
