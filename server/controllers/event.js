import Event from '../models/event';

export const create = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

export const list = async (req, res) => {
  try {
    const {skip, limit} = req.query;
    if (!skip || !limit) {
      return res
        .status(400)
        .send({error: 'skip and limit query fields are required.'});
    }
    const events = await Event.find({})
      .sort('-createdAt')
      .skip(parseInt(skip, 10))
      .limit(parseInt(limit, 10));
    res.send({events});
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};

export const read = async (req, res) => {
  const {id} = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send({error: e.message});
  }
};

export const update = async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  try {
    const event = await Event.findByIdAndUpdate(id, updates, {new: true});

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send({error: e.message});
  }
};

export const remove = async (req, res) => {
  const {id} = req.params;

  try {
    const event = await Event.findByIdAndRemove(id);

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send({error: e.message});
  }
};
