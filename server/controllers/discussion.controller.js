import Discussion from '../models/discussion.model';

const create = (req, res) => {
  const {title} = req.body;

  const discussion = {
    title,
    createdBy: req.auth._id,
  };

  new Discussion (discussion).save ().then (doc => {
    console.log (doc);
  });
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
