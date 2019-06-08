import User from '../models/user.model';

export const create = (req, res) => {
  const user = new User (req.body);
  user
    .save ()
    .then (doc => {
      res.status (200).json ({
        message: 'Account created',
      });
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
  const {userId} = req.params;

  User.findById (userId)
    .then (user => {
      res.status (200).json (user);
    })
    .catch (err => {
      res.status (400).json ({
        errorMessage: 'Unable to fetch User',
      });
    });
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
