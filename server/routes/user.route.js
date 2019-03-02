import express from 'express';
import UserCtrl from '../controllers/user.controller';

const router = express.Router ();

router.route ('/api/user').post (UserCtrl.create);

export default router;
