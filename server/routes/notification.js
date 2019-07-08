import express from 'express';
import auth from '../middlewares/auth';
import {create, update} from '../controllers/notification';
const router = express.Router ();

router.route ('/api/notification').post (auth, create);

router.route ('/api/notification/:id').patch (auth, update);

export default router;
