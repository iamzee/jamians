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
  currentUser,
  addAvatar,
  getAvatar,
} from '../controllers/user';
import {
  addFriendRequestReceived,
  removeFriendRequestReceived,
  hasAuthorization,
} from '../middlewares/user';
import auth from '../middlewares/auth';

const router = express.Router();

router
  .route('/api/users')
  .post(create)
  .get(auth, list);

router.route('/api/users/me').get(auth, currentUser);

router
  .route('/api/users/:id')
  .get(auth, read)
  .patch(auth, update);

router
  .route('/api/users/:id/avatar')
  .post(addAvatar)
  .get(getAvatar);

router
  .route('/api/users/:id/friendRequest')
  .post(auth, addFriendRequestReceived, addFriendRequestSent)
  .delete(auth, removeFriendRequestReceived, removeFriendRequestSent);

router
  .route('/api/users/:id/friend')
  .post(auth, addFriend)
  .delete(auth, removeFriend);

export default router;
