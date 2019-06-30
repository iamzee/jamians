import express from 'express';
import {
  create,
  list,
  read,
  update,
  remove,
  addGoing,
  removeGoing,
  addBookmark,
  removeBookmark,
  addDiscussion,
  listDiscussion,
  addComment,
  listComment,
} from '../controllers/event';
import auth from '../middlewares/auth';
const router = express.Router();

router
  .route('/api/event')
  .post(auth, create)
  .get(auth, list);

router
  .route('/api/event/:id')
  .get(auth, read)
  .patch(auth, update)
  .delete(auth, remove);

router
  .route('/api/event/:id/going')
  .post(auth, addGoing)
  .delete(auth, removeGoing);

router
  .route('/api/event/:id/bookmark')
  .post(auth, addBookmark)
  .delete(auth, removeBookmark);

router
  .route('/api/event/:id/discussion')
  .post(auth, addDiscussion)
  .get(auth, listDiscussion);

router
  .route('/api/event/:id/discussion/:discussionId/addComment')
  .post(auth, addComment)
  .get(auth, listComment);

export default router;
