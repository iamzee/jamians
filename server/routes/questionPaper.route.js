import express from 'express';
import {create} from '../controllers/questionPaper.controller';

const router = express.Router ();

router.route ('/api/questionPaper').post (create);

export default router;
