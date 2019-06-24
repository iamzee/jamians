import express from 'express';
import {create} from '../controllers/user';

const router = express.Router();

router.route('/api/users').post(create);

export default router;
