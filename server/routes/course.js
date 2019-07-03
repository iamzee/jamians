import express from 'express';
import {create, read, list} from '../controllers/course';

const router = express.Router();

router
  .route('/api/course')
  .post(create)
  .get(list);

router.route('/api/course/:id').get(read);

export default router;
