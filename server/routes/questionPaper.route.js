import express from 'express';
import {create, list, read} from '../controllers/questionPaper.controller';

const router = express.Router ();

router.route ('/api/questionPaper').post (create).get (list);

router.route ('/api/questionPaper/:questionPaperId').get (read);

export default router;
