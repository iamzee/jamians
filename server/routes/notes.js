import express from 'express';
import auth from '../middlewares/auth';
import {
  create,
  list,
  read,
  addBookmark,
  removeBookmark,
  getBookmarkedNotes,
} from '../controllers/notes';

const router = express.Router();

router
  .route('/api/notes')
  .post(auth, create)
  .get(auth, list);

router.route('/api/notes/:id').get(auth, read);

router
  .route('/api/notes/:id/bookmark')
  .get(auth, getBookmarkedNotes)
  .post(auth, addBookmark)
  .delete(auth, removeBookmark);

// router.route('/api/note/count').get(noteCtrl.count);

export default router;
