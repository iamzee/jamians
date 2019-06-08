import Event from '../models/event.model';

const create = (req, res) => {
  const {_id} = req.user;

  new Event ({...req.body, createdBy: _id})
    .save ()
    .then (doc => {
      console.log (doc);
    })
    .catch (err => {
      console.log (err);
    });
};

const list = (req, res) => {
  Event.find ({}).sort ('-createdAt').then (docs => {
    res.status (200).json ({events: docs});
  });
};

const addBookmark = (req, res) => {
  const {eventId} = req.body;
  const userId = req.user._id;
  console.log (req.body);

  Event.findById (eventId).then (event => {
    if (!event) {
      return res.status (400).json ({
        errorMessage: 'Event not found',
      });
    }

    event.bookmarks.push (userId);

    event
      .save ()
      .then (doc => {
        console.log (doc);
        res.json (doc);
      })
      .catch (err => {
        console.log (err);
      });
  });
};

const removeBookmark = (req, res) => {
  const userId = req.user._id;
  const eventId = req.body.eventId;

  Event.findByIdAndUpdate (eventId, {$pull: {bookmarks: userId}}, {new: true})
    .then (doc => {
      res.status (200).json (doc);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to update event',
      });
    });
};

const getBookmarks = (req, res) => {
  const userId = req.user._id;
  Event.find ({bookmarks: {$eq: userId}})
    .then (docs => {
      res.status (200).json ({
        events: docs,
      });
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to fetch event bookmarks',
      });
    });
};

const update = (req, res) => {
  const {eventId} = req.params;

  Event.findById (eventId)
    .then (event => {
      console.log ('CREATEDBY', typeof event.createdBy);
      console.log ('ID', typeof req.user._id);
      if (!event) {
        return res.status (400).json ({
          errorMessage: 'Event does not exist',
        });
      } else if (
        JSON.stringify (event.createdBy) !== JSON.stringify (req.user._id)
      ) {
        return res.status (401).json ({
          errorMessage: 'Authorization failed!',
        });
      }

      Event.findByIdAndUpdate (eventId, req.body, {new: true})
        .then (doc => {
          res.status (200).json (doc);
        })
        .catch (err => {
          res.status (400).json ({
            err,
            errorMessage: 'Unable to update event',
          });
        });
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to update event',
      });
    });
};

const read = (req, res) => {
  const {eventId} = req.params;

  Event.findById (eventId)
    .then (event => {
      if (!event) {
        return res.status (400).json ({
          errorMessage: 'No event found',
        });
      }

      res.status (200).json (event);
    })
    .catch (err => {
      res.status (400).json ({
        err,
        errorMessage: 'Unable to fetch event',
      });
    });
};

export default {
  create,
  list,
  addBookmark,
  removeBookmark,
  getBookmarks,
  update,
  read,
};
