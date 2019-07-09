import express from 'express';
import auth from '../middlewares/auth';
import {create, update, list} from '../controllers/notification';
const router = express.Router ();

router.route ('/api/notification').post (auth, create).get (auth, list);

router.route ('/api/notification/:id').patch (auth, update);

export default router;
