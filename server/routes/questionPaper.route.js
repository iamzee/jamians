import express from 'express';
import {create, list} from '../controllers/questionPaper.controller';

const router = express.Router ();

router.route ('/api/questionPaper').post (create).get (list);

export default router;
