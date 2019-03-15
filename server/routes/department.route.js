import express from 'express';
import {create, list} from '../controllers/department.controller';

const router = express.Router ();

router.route ('/api/department').post (create).get (list);

export default router;
