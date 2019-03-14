import express from 'express';
import noteCtrl from '../controllers/note.controller';

const router = express.Router ();

router.route ('/api/note').post (noteCtrl.create).get (noteCtrl.list);

router.route ('/api/note/addBookmark').post (noteCtrl.addBookmark);

router.route ('/api/note/removeBookmark').post (noteCtrl.removeBookmark);

export default router;
