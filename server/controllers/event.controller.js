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

export default {create, list};
