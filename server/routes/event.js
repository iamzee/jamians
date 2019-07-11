import express from 'express';
import {
  createEvent,
  createPoster,
  listEvents,
  editEvent,
  readPoster,
  readEvent,
  removeEvent,
} from '../controllers/event';
import auth from '../middlewares/auth';
import hasAuthorization from '../middlewares/event';
const router = express.Router();

router
  .route('/api/events')
  .post(auth, createEvent)
  .get(auth, listEvents);

router
  .route('/api/events/:id')
  .get(auth, readEvent)
  .patch(auth, editEvent)
  .delete(auth, hasAuthorization, removeEvent);

router
  .route('/api/events/:id/poster')
  .post(auth, hasAuthorization, createPoster)
  .get(readPoster);

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
