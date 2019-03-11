import express from 'express';
import noteCtrl from '../controllers/note.controller';

const router = express.Router ();

router.route ('/api/note').post (noteCtrl.create).get (noteCtrl.list);

router.route ('/api/note/bookmark').post (noteCtrl.addBookmark);

export default router;
