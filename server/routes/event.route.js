import express from 'express';
import authCtrl from '../controllers/auth.controller';
import eventCtrl from '../controllers/event.controller';

const router = express.Router ();

router
  .route ('/api/event')
  .get (authCtrl.requireSignin, eventCtrl.list)
  .post (authCtrl.requireSignin, eventCtrl.create);

export default router;
