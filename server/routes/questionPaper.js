import express from 'express';
import {
  create,
  list,
  read,
  addBookmark,
  removeBookmark,
  listBookmarks,
} from '../controllers/questionPaper';

import auth from '../middlewares/auth';

const router = express.Router ();

router.route ('/api/questionPaper').post (auth, create).get (auth, list);

router.route ('/api/questionPaper/bookmark').get (auth, listBookmarks);

router.route ('/api/questionPaper/:id').get (auth, read);

router
  .route ('/api/questionPaper/:id/bookmark')
  .post (auth, addBookmark)
  .delete (auth, removeBookmark);

export default router;
