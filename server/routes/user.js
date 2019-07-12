import express from 'express';
import {
  create,
  updateMe,
  list,
  read,
  addFriendRequestSent,
  removeFriendRequestSent,
  addFriend,
  removeFriend,
  readMe,
  addAvatar,
  updateMyAvatar,
  readAvatar,
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
  .route('/api/users/me')
  .get(auth, readMe)
  .patch(auth, updateMe);

router.route('/api/users/me/avatar').patch(auth, updateMyAvatar);

router.route('/api/users/:id').get(auth, read);

router
  .route('/api/users/:id/avatar')
  .get(readAvatar)
  .post(addAvatar);

router
  .route('/api/users/:id/friendRequest')
  .post(auth, addFriendRequestReceived, addFriendRequestSent)
  .delete(auth, removeFriendRequestReceived, removeFriendRequestSent);

router
  .route('/api/users/:id/friend')
  .post(auth, addFriend)
  .delete(auth, removeFriend);

export default router;
