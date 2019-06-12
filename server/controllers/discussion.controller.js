import Discussion from '../models/discussion.model';

const create = async (req, res) => {
  try {
    const discussion = new Discussion ({
      title: req.body.title,
      createdBy: req.user._id,
    });

    await discussion.save ();

    res.status (201).send (discussion);
  } catch (e) {
    res.status (400).send (e);
  }
};

const list = (req, res) => {
  Discussion.find ({}).populate ('createdBy', 'name').then (docs => {
    res.send ({discussions: docs});
  });
};

const read = (req, res) => {
  const {discussionId} = req.params;

  Discussion.findById (discussionId)
    .populate ('createdBy', 'name')
    .populate ({
      path: 'chats',
      select: 'text createdBy createdAt',
      populate: {
        path: 'createdBy',
        select: 'name',
      },
    })
    .then (doc => {
      res.status (200).json (doc);
    });
};

export default {create, list, read};
