import express from 'express';
import {create, list} from '../controllers/subject';
import auth from '../middlewares/auth';

const router = express.Router();

router
  .route('/api/subject')
  .post(create)
  .get(auth, list);

export default router;
