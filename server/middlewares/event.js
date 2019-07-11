import Event from '../models/event';

export default async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send();
    }

    next();
  } catch (e) {
    res.status(500).send();
  }
};
