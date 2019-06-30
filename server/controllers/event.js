import Event from '../models/event';

export const create = async (req, res) => {
  try {
    const event = new Event({...req.body, createdBy: req.user._id});
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
    const events = await Event.find()
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
    await event.populate('going', 'name').execPopulate();
    await event.populate('bookmark', 'name').execPopulate();
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
    const event = await Event.findOneAndUpdate(
      {_id: id, createdBy: req.user._id},
      updates,
      {new: true}
    );

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
    const event = await Event.findOneAndRemove({
      _id: id,
      createdBy: req.user._id,
    });

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(400).send({error: e.message});
  }
};

export const addGoing = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;

  try {
    const eventMatched = await Event.findOne({
      _id: eventId,
      going: {$in: userId},
    });

    if (eventMatched) {
      return res.status(400).send();
    }

    const event = await Event.findByIdAndUpdate(
      eventId,
      {$push: {going: userId}},
      {new: true}
    );

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.staus(400).send(e.response);
  }
};

export const removeGoing = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;

  try {
    const eventMatched = await Event.findOne({
      _id: eventId,
      going: {$in: userId},
    });

    if (!eventMatched) {
      return res.status(400).send();
    }

    const event = await Event.findByIdAndUpdate(
      eventId,
      {$pull: {going: userId}},
      {new: true}
    );

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.staus(400).send(e);
  }
};

export const addBookmark = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;

  try {
    const eventMatched = await Event.findOne({
      _id: eventId,
      bookmark: {$in: userId},
    });

    if (eventMatched) {
      return res.status(400).send();
    }

    const event = await Event.findByIdAndUpdate(
      eventId,
      {$push: {bookmark: userId}},
      {new: true}
    );

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.staus(400).send(e.response);
  }
};

export const removeBookmark = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;

  try {
    const eventMatched = await Event.findOne({
      _id: eventId,
      bookmark: {$in: userId},
    });

    if (!eventMatched) {
      return res.status(400).send();
    }

    const event = await Event.findByIdAndUpdate(
      eventId,
      {$pull: {bookmark: userId}},
      {new: true}
    );

    if (!event) {
      return res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.staus(400).send(e.response);
  }
};
