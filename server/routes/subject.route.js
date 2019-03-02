import express from 'express';
import subjectCtrl from '../controllers/subject.controller';

const router = express.Router ();

router.route ('/api/subject').post (subjectCtrl.create);

export default router;
