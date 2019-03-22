import express from 'express';
import {generateSAS} from '../controllers/upload.controller';

const router = express.Router ();

router.route ('/generateSAS').post (generateSAS);

export default router;
