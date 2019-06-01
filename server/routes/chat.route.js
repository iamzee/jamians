import express from 'express';
import authCtrl from '../controllers/auth.controller';
import chatCtrl from '../controllers/chat.controller';

const router = express.Router ();

router.route ('/api/chat').post (authCtrl.requireSignin, chatCtrl.create);

module.exports = router;
