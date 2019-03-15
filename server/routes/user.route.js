import express from 'express';
import {create, userById, read} from '../controllers/user.controller';

const router = express.Router ();

router.route ('/api/user').post (create);

router.route ('/api/user/:userId').get (read);

router.param ('userId', userById);

export default router;
