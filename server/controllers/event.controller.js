import Event from '../models/event.model';

const create = (req, res) => {
  const {title, article} = req.body;
  const {_id} = req.auth;

  const event = {
    createdBy: _id,
    title,
    article,
  };

  new Event(event)
    .save()
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

const list = (req, res) => {
  Event.find({})
    .sort('-createdAt')
    .then(docs => {
      res.status(200).json({events: docs});
    });
};

export default {create, list};
