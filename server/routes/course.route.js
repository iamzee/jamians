import express from 'express';
import {create, update} from '../controllers/course.controller';

const router = express.Router ();

router.route ('/api/course').post (create);

router.route ('/api/course/:courseId').post (update);

export default router;
