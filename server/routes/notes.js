import express from 'express';
// import noteCtrl from '../controllers/note.controller';
import authCtrl from '../controllers/auth.controller';
import auth from '../middlewares/auth';
import {create, list, getBookmarkedNotes} from '../controllers/notes';

const router = express.Router();

router
  .route('/api/notes')
  .post(auth, create)
  .get(auth, list);

// router.route('/api/note/:noteId/bookmark').get(auth, getBookmarkedNotes);

// router.route('/api/note/bookmarks').get(authCtrl.requireSignin);

// router.route('/api/note/count').get(noteCtrl.count);

// router
//   .route('/api/note/addBookmark')
//   .post(authCtrl.requireSignin, noteCtrl.addBookmark);

// router
//   .route('/api/note/removeBookmark')
//   .post(authCtrl.requireSignin, noteCtrl.removeBookmark);

// router.route('/api/note/:noteId').get(noteCtrl.read);

export default router;
