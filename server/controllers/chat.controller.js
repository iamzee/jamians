import Chat from '../models/chat.model';

const create = (req, res) => {
  const {text} = req.body;

  const chat = {
    createdBy: req.auth._id,
    text,
  };

  console.log (req.auth);

  new Chat (chat).save ().then (doc => {
    console.log (doc);
  });
};

export default {create};
