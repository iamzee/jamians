import express from 'express';
import noteCtrl from '../controllers/note.controller';

const router = express.Router ();

router.route ('/api/note').post (noteCtrl.create).get (noteCtrl.list);

export default router;
