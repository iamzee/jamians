import express from 'express';
import {create, read} from '../controllers/user';
import auth from '../middlewares/auth';

const router = express.Router();

router.route('/api/users').post(create);

router.route('/api/users/:id').get(auth, read);

export default router;
