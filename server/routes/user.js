import express from 'express';
import {
  create,
  update,
  list,
  read,
  addFriendRequestSent,
  removeFriendRequestSent,
  addFriend,
  removeFriend,
} from '../controllers/user';
import {
  addFriendRequestReceived,
  removeFriendRequestReceived,
} from '../middlewares/user';
import auth from '../middlewares/auth';

const router = express.Router();

router
  .route('/api/users')
  .post(create)
  .get(auth, list);

router
  .route('/api/users/:id')
  .get(auth, read)
  .patch(auth, update);

// router
//   .route ('/api/users/:id/follower')
//   .post (auth, addFollower, addFollowing)
//   .delete (auth, removeFollower, removeFollowing);

router
  .route('/api/users/:id/friendRequest')
  .post(auth, addFriendRequestReceived, addFriendRequestSent)
  .delete(auth, removeFriendRequestReceived, removeFriendRequestSent);

router
  .route('/api/users/:id/friend')
  .post(auth, addFriend)
  .delete(auth, removeFriend);

export default router;
