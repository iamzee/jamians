import Event from '../models/event';
import formidable from 'formidable';
import _ from 'lodash';
import {upload, download, deleteBlob} from '../azure/blob';
import uuid from 'uuid/v1';
import p from 'path';
import tmp from 'tmp';

export const createEvent = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.maxFileSize = 0.5 * 1024 * 1024;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).send(e);
      }

      const allowedKeys = [
        'title',
        'body',
        'startDate',
        'endDate',
        'category',
        'registration',
        'poster',
      ];

      let blob = null;

      if (files.poster) {
        blob = uuid();

        if (files.poster.type === 'image/png') {
          blob = `${blob}.png`;
        } else if (files.poster.type === 'image/jpeg') {
          blob = `${blob}.jpg`;
        } else {
          return res.status(400).send({error: 'Invalid file type.'});
        }

        await upload('events', blob, files.poster.path);
      }

      allowedKeys.forEach(key => {
        if (!fields[key]) {
          delete fields[key];
        }
      });

      const event = new Event({
        ...fields,
        poster: blob,
        createdBy: req.user._id,
      });

      await event.save();

      res.send(event);
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

export const listEvents = async (req, res) => {
  try {
    const {skip, limit} = req.query;
    if (!skip || !limit) {
      return res
        .status(400)
        .send({error: 'skip and limit query fields are required.'});
    }
    const events = await Event.find({})
      .populate('createdBy', 'name')
      .sort('-createdAt')
      .skip(parseInt(skip, 10))
      .limit(parseInt(limit, 10));
    res.send({events});
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};

export const readPoster = (req, res) => {
  try {
    tmp.dir({unsafeCleanup: true}, async function _tempDirCreated(
      err,
      path,
      cleanCallback
    ) {
      if (err) {
        throw new Error(err);
      }

      console.log('Dir: ', path);

      const event = await Event.findById(req.params.id);

      const blob = await download('events', event.poster, path);

      res.set('Content-Type', blob.contentSettings.contentType);
      res.sendFile(p.resolve(path, event.poster));

      cleanCallback();
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const readEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: 'createdBy',
        select: 'name',
      })
      .populate({
        path: 'comments.createdBy',
        select: 'name',
      })
      .populate({
        path: 'comments.replies.createdBy',
        select: 'name',
      })
      .exec();

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const editEvent = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.maxFileSize = 0.5 * 1024 * 1024;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).send(err);
      }

      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).send();
      }

      const allowedKeys = [
        'title',
        'body',
        'startDate',
        'endDate',
        'category',
        'registration',
        'poster',
      ];

      allowedKeys.forEach(key => {
        if (!fields[key]) {
          delete fields[key];
        }
      });

      console.log('FIELDS______________', fields);

      if (files.poster) {
        if (event.poster) {
          await deleteBlob('events', event.poster);
        }

        let blob = uuid();
        if (files.poster.type === 'image/png') {
          blob = `${blob}.png`;
        } else if (files.poster.type === 'image/jpeg') {
          blob = `${blob}.jpg`;
        } else {
          return res.status(400).send({error: 'Invalid file type.'});
        }

        await upload('events', blob, files.poster.path);
        fields.poster = blob;
      }

      _.keys(fields).forEach(key => {
        event[key] = fields[key];
      });
      await event.save();
      res.send(event);
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

export const removeEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id);

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send();
  }
};

export const createComment = async (req, res) => {
  try {
    let comment = _.pick(req.body, ['text']);
    const eventId = req.params.id;
    const userId = req.user._id;

    comment = {...comment, createdBy: userId};

    const event = await Event.findByIdAndUpdate(
      eventId,
      {$push: {comments: comment}},
      {new: true}
    )
      .populate({
        path: 'createdBy',
        select: 'name',
      })
      .populate({
        path: 'comments.createdBy',
        select: 'name',
      })
      .exec();

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const addReply = async (req, res) => {
  try {
    let reply = _.pick(req.body, ['text']);
    const eventId = req.params.id;
    const {commentId} = req.params;

    const event = await Event.findById(eventId);

    event.comments.forEach(comment => {
      if (comment._id.toString() === commentId) {
        comment.replies.push({...reply, createdBy: req.user._id});
      }
    });

    await event
      .populate({
        path: 'comments.createdBy',
        select: 'name',
      })
      .populate({
        path: 'comments.replies.createdBy',
        select: 'name',
      })
      .execPopulate();

    await event.save();
    res.send(event);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

// export const read = async (req, res) => {
//   const {id} = req.params;

//   try {
//     const event = await Event.findById (id);
//     await event.populate ('going', 'name').execPopulate ();
//     await event.populate ('bookmark', 'name').execPopulate ();
//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.status (400).send ({error: e.message});
//   }
// };

// export const update = async (req, res) => {
//   const {id} = req.params;
//   const updates = req.body;

//   try {
//     const event = await Event.findOneAndUpdate (
//       {_id: id, createdBy: req.user._id},
//       updates,
//       {new: true}
//     );

//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.status (400).send ({error: e.message});
//   }
// };

// export const remove = async (req, res) => {
//   const {id} = req.params;

//   try {
//     const event = await Event.findOneAndRemove ({
//       _id: id,
//       createdBy: req.user._id,
//     });

//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.status (400).send ({error: e.message});
//   }
// };

// export const addGoing = async (req, res) => {
//   const eventId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const eventMatched = await Event.findOne ({
//       _id: eventId,
//       going: {$in: userId},
//     });

//     if (eventMatched) {
//       return res.status (400).send ();
//     }

//     const event = await Event.findByIdAndUpdate (
//       eventId,
//       {$push: {going: userId}},
//       {new: true}
//     );

//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.staus (400).send (e.response);
//   }
// };

// export const removeGoing = async (req, res) => {
//   const eventId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const eventMatched = await Event.findOne ({
//       _id: eventId,
//       going: {$in: userId},
//     });

//     if (!eventMatched) {
//       return res.status (400).send ();
//     }

//     const event = await Event.findByIdAndUpdate (
//       eventId,
//       {$pull: {going: userId}},
//       {new: true}
//     );

//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.staus (400).send (e);
//   }
// };

// export const addBookmark = async (req, res) => {
//   const eventId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const eventMatched = await Event.findOne ({
//       _id: eventId,
//       bookmark: {$in: userId},
//     });

//     if (eventMatched) {
//       return res.status (400).send ();
//     }

//     const event = await Event.findByIdAndUpdate (
//       eventId,
//       {$push: {bookmark: userId}},
//       {new: true}
//     );

//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.staus (400).send (e.response);
//   }
// };

// export const removeBookmark = async (req, res) => {
//   const eventId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const eventMatched = await Event.findOne ({
//       _id: eventId,
//       bookmark: {$in: userId},
//     });

//     if (!eventMatched) {
//       return res.status (400).send ();
//     }

//     const event = await Event.findByIdAndUpdate (
//       eventId,
//       {$pull: {bookmark: userId}},
//       {new: true}
//     );

//     if (!event) {
//       return res.status (404).send ();
//     }

//     res.send (event);
//   } catch (e) {
//     res.staus (400).send (e.response);
//   }
// };

// export const addDiscussion = async (req, res) => {
//   const eventId = req.params.id;
//   const userId = req.user._id;

//   const eventDiscussion = new EventDiscussion ({
//     ...req.body,
//     createdBy: userId,
//     event: eventId,
//   });

//   try {
//     await eventDiscussion.save ();
//     await eventDiscussion.populate ('createdBy', 'name').execPopulate ();
//     res.send (eventDiscussion);
//   } catch (e) {
//     res.status (400).send (e);
//   }
// };

// export const listDiscussion = async (req, res) => {
//   const eventId = req.params.id;

//   try {
//     const discussions = await EventDiscussion.find ({event: eventId})
//       .sort ('-createdAt')
//       .populate ('createdBy', 'name');
//     res.send ({discussions});
//   } catch (e) {
//     res.status (500).send ();
//   }
// };

// export const addComment = async (req, res) => {
//   const {discussionId} = req.params;
//   const eventId = req.params.id;
//   const userId = req.user._id;

//   const comment = new EventDiscussionComment ({
//     ...req.body,
//     createdBy: userId,
//     discussion: discussionId,
//     event: eventId,
//   });

//   try {
//     const matchedDiscussion = await EventDiscussion.findOne ({
//       _id: discussionId,
//       event: eventId,
//     });

//     if (!matchedDiscussion) {
//       return res.status (400).send ();
//     }

//     await comment.save ();
//     await comment
//       .populate ('createdBy', 'name')
//       .populate ('event', 'createdBy')
//       .execPopulate ();
//     res.send (comment);
//   } catch (e) {
//     res.status (400).send (e);
//   }
// };

// export const listComment = async (req, res) => {
//   const {discussionId} = req.params;
//   const eventId = req.params.id;

//   try {
//     const matchedDiscussion = await EventDiscussion.findOne ({
//       _id: discussionId,
//       event: eventId,
//     });

//     if (!matchedDiscussion) {
//       return res.status (400).send ();
//     }

//     const comments = await EventDiscussionComment.find ({
//       discussion: discussionId,
//     })
//       .sort ('-createdAt')
//       .populate ('createdBy', 'name')
//       .populate ('event', 'createdBy');
//     res.send ({comments});
//   } catch (e) {
//     res.status (400).send (e);
//   }
// };
