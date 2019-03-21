import express from 'express';
import {create} from '../controllers/course.controller';

const router = express.Router ();

router.route ('/api/course').post (create);

export default router;
