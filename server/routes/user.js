import express from 'express';
import {create, read, addFollowing, removeFollowing} from '../controllers/user';
import {addFollower, removeFollower} from '../middlewares/user';
import auth from '../middlewares/auth';

const router = express.Router ();

router.route ('/api/users').post (create);

router.route ('/api/users/:id').get (auth, read);

router
  .route ('/api/users/:id/follower')
  .post (auth, addFollower, addFollowing)
  .delete (auth, removeFollower, removeFollowing);

export default router;
