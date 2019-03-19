import express from 'express';
import {
  create,
  list,
  read,
  update,
} from '../controllers/questionPaper.controller';

const router = express.Router ();

router.route ('/api/questionPaper').post (create).get (list);

router.route ('/api/questionPaper/:questionPaperId').get (read).post (update);

export default router;
