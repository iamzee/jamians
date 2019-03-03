import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router ();

router.route ('/api/login').post (authCtrl.login);

router.route ('/api/logout').post (authCtrl.logout);

router
  .route ('/api/current_user')
  .get (authCtrl.requireSignin, authCtrl.currentUser);

export default router;
