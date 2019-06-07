import express from 'express';
import authCtrl from '../controllers/auth.controller';
import eventCtrl from '../controllers/event.controller';

const router = express.Router ();

router
  .route ('/api/event')
  .get (authCtrl.requireSignin, eventCtrl.list)
  .post (authCtrl.requireSignin, eventCtrl.create);

router
  .route ('/api/event/addBookmark')
  .post (authCtrl.requireSignin, eventCtrl.addBookmark);

router
  .route ('/api/event/removeBookmark')
  .post (authCtrl.requireSignin, eventCtrl.removeBookmark);

router
  .route ('/api/event/bookmarks')
  .get (authCtrl.requireSignin, eventCtrl.getBookmarks);

export default router;
