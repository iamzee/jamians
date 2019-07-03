import express from 'express';
import {create, list, read} from '../controllers/department';

const router = express.Router();

router
  .route('/api/department')
  .post(create)
  .get(list);

router.route('/api/department/:id').get(read);

export default router;
