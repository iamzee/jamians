import express from 'express';
import {create, update, read, list} from '../controllers/course.controller';

const router = express.Router ();

router.route ('/api/course').post (create).get (list);

router.route ('/api/course/:courseId').get (read).post (update);

export default router;
