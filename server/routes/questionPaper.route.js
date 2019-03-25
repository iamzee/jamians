import express from 'express';
import {
  create,
  list,
  read,
  update,
  listBookmarks,
  count,
} from '../controllers/questionPaper.controller';

import authCtrl from '../controllers/auth.controller';

const router = express.Router ();

router.route ('/api/questionPaper').post (create).get (list);

router.route ('/api/questionPaper/count').get (count);

router
  .route ('/api/questionPaper/bookmarks')
  .get (authCtrl.requireSignin, listBookmarks);

router.route ('/api/questionPaper/:questionPaperId').get (read).post (update);

export default router;
