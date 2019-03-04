import express from 'express';
import uploadCtrl from '../controllers/upload.controller';

const router = express.Router ();

router.route ('/api/upload/notes').get (uploadCtrl.uploadNotes);

export default router;
