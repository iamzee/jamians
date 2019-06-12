import Chat from '../models/chat.model';

const create = async (req, res) => {
  const {discussion} = req.query;

  if (!discussion) {
    return res
      .status (400)
      .send ({errorMessage: 'Bad request. Discussion query required.'});
  }

  try {
    const chat = new Chat ({
      text: req.body.text,
      createdBy: req.user._id,
      discussion,
    });

    await chat.save ();

    res.status (201).send (chat);
  } catch (e) {
    res.status (401).send (e);
  }
};

const list = async (req, res) => {
  const {discussion} = req.query;

  if (!discussion) {
    return res.status (400).send ('Bad Request. Discussion query required.');
  }

  try {
    const chats = await Chat.find ({discussion})
      .sort ('createdAt')
      .populate ('createdBy', 'name');

    res.status (200).send ({
      chats,
    });
  } catch (e) {
    res.status (500).send (e);
  }
};

export default {create, list};
