import express from 'express';
import {
  POST_EVENT,
  POST_POSTER,
  list,
  edit,
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
  readPoster,
} from '../controllers/event';
import auth from '../middlewares/auth';
import hasAuthorization from '../middlewares/event';
const router = express.Router();

router
  .route('/api/events')
  .post(auth, POST_EVENT)
  .get(auth, list)
  .patch(auth, edit);

router
  .route('/api/events/:id/poster')
  .post(auth, hasAuthorization, POST_POSTER)
  .get(auth, readPoster);

// router
//   .route ('/api/event/:id')
//   .get (auth, read)
//   .patch (auth, update)
//   .delete (auth, remove);

// router
//   .route ('/api/event/:id/going')
//   .post (auth, addGoing)
//   .delete (auth, removeGoing);

// router
//   .route('/api/event/:id/bookmark')
//   .post(auth, addBookmark)
//   .delete(auth, removeBookmark);

// router
//   .route('/api/event/:id/discussion')
//   .post(auth, addDiscussion)
//   .get(auth, listDiscussion);

// router
//   .route('/api/event/:id/discussion/:discussionId/addComment')
//   .post(auth, addComment)
//   .get(auth, listComment);

export default router;
