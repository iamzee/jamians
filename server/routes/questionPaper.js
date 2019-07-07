import express from 'express';
import {
  create,
  list,
  read,
  update,
  listBookmarks,
  count,
} from '../controllers/questionPaper';

import auth from '../middlewares/auth';

const router = express.Router ();

router.route ('/api/questionPaper').post (auth, create).get (auth, list);

router.route ('/api/questionPaper/count').get (count);

router.route ('/api/questionPaper/bookmarks').get (listBookmarks);

router.route ('/api/questionPaper/:id').get (auth, read).post (update);

export default router;
