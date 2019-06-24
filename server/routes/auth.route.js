// import express from 'express';
// import passport from 'passport';
// import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

// import User from '../models/user.model';

// const router = express.Router ();

// passport.serializeUser ((user, cb) => {
//   cb (null, user._id);
// });

// passport.deserializeUser ((id, cb) => {
//   User.findById (id).then (doc => {
//     cb (null, doc);
//   });
// });

// passport.use (
//   new GoogleStrategy (
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOne ({googleID: profile.id}).then (doc => {
//         if (doc) {
//           console.log ('User exists');
//           return cb (null, doc);
//         }

//         const user = {
//           googleID: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           profilePicture: profile.photos[0].value,
//         };

//         new User (user)
//           .save ()
//           .then (doc => {
//             console.log (doc);
//             cb (null, doc);
//           })
//           .catch (err => {
//             console.log (err);
//           });
//       });
//     }
//   )
// );

// router
//   .route ('/auth/google')
//   .get (passport.authenticate ('google', {scope: ['profile', 'email']}));

// router
//   .route ('/auth/google/callback')
//   .get (
//     passport.authenticate ('google', {failureRedirect: '/login'}),
//     (req, res) => {
//       res.redirect ('/');
//     }
//   );

// router.route ('/api/current_user').get ((req, res) => {
//   res.send (req.user);
// });

// router.route ('/api/logout').get ((req, res) => {
//   req.logout ();
//   res.redirect ('/login');
// });

// export default router;
