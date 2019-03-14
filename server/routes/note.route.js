import express from 'express';
import noteCtrl from '../controllers/note.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router ();

router.route ('/api/note').post (noteCtrl.create).get (noteCtrl.list);

router.route ('/api/note/addBookmark').post (noteCtrl.addBookmark);

router.route ('/api/note/removeBookmark').post (noteCtrl.removeBookmark);

router
  .route ('/api/note/bookmarks')
  .get (authCtrl.requireSignin, noteCtrl.getBookmarkedNotes);

export default router;
