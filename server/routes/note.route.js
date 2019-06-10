import express from 'express';
import noteCtrl from '../controllers/note.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router ();

router
  .route ('/api/note')
  .post (authCtrl.requireSignin, noteCtrl.create)
  .get (authCtrl.requireSignin, noteCtrl.list);

router
  .route ('/api/note/bookmarks')
  .get (authCtrl.requireSignin, noteCtrl.getBookmarkedNotes);

router.route ('/api/note/count').get (noteCtrl.count);

router
  .route ('/api/note/addBookmark')
  .post (authCtrl.requireSignin, noteCtrl.addBookmark);

router
  .route ('/api/note/removeBookmark')
  .post (authCtrl.requireSignin, noteCtrl.removeBookmark);

router.route ('/api/note/:noteId').get (noteCtrl.read);

export default router;
