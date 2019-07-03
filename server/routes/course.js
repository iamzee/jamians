import express from 'express';
import {create, read, list} from '../controllers/course';
import auth from '../middlewares/auth';

const router = express.Router();

router
  .route('/api/course')
  .post(create)
  .get(auth, list);

router.route('/api/course/:id').get(read);

export default router;
