import express from 'express';
import auth from '../middlewares/auth';
import {
  create,
  list,
  read,
  remove,
  addBookmark,
  removeBookmark,
  getBookmarkedNotes,
  downloadNote,
} from '../controllers/notes';

const router = express.Router ();

router.route ('/api/notes').post (auth, create).get (auth, list);

router.route ('/api/notes/bookmark').get (auth, getBookmarkedNotes);

router.route ('/api/notes/:id').get (auth, read).delete (auth, remove);

router.route ('/api/notes/:id/download').get (downloadNote);

router
  .route ('/api/notes/:id/bookmark')
  .post (auth, addBookmark)
  .delete (auth, removeBookmark);

export default router;
