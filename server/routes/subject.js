import express from 'express';
import {create, list} from '../controllers/subject';

const router = express.Router();

router
  .route('/api/subject')
  .post(create)
  .get(list);

export default router;
