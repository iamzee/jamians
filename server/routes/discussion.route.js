import express from 'express';
import authCtrl from '../controllers/auth.controller';
import discussionCtrl from '../controllers/discussion.controller';

const router = express.Router ();

router
  .route ('/api/discussion')
  .get (authCtrl.requireSignin, discussionCtrl.list)
  .post (authCtrl.requireSignin, discussionCtrl.create);

router
  .route ('/api/discussion/:discussionId')
  .get (authCtrl.requireSignin, discussionCtrl.read);

module.exports = router;
