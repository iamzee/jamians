import express from 'express';
import {create, list, read, update, remove} from '../controllers/event';
import auth from '../middlewares/auth';
const router = express.Router();

router
  .route('/api/event')
  .post(auth, create)
  .get(auth, list);

router
  .route('/api/event/:id')
  .get(auth, read)
  .patch(auth, update)
  .delete(auth, remove);

export default router;
