import express from 'express';
import {create, list, read, update, remove} from '../controllers/event';
const router = express.Router();

router
  .route('/api/event')
  .post(create)
  .get(list);

router
  .route('/api/event/:id')
  .get(read)
  .patch(update)
  .delete(remove);

export default router;
