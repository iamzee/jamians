import express from 'express';
import {create, update, read} from '../controllers/course.controller';

const router = express.Router ();

router.route ('/api/course').post (create);

router.route ('/api/course/:courseId').get (read).post (update);

export default router;
