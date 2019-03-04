import express from 'express';
import teacherCtrl from '../controllers/teacher.controller';

const router = express.Router ();

router.route ('/api/teacher').post (teacherCtrl.create).get (teacherCtrl.list);

export default router;
