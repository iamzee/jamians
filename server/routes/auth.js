import express from 'express';
import {login} from '../controllers/auth';

const router = express.Router();

router.route('/api/login').post(login);

export default router;
