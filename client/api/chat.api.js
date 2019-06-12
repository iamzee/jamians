import axios from 'axios';

export const listChat = async discussionId => {
  const {data} = await axios ({
    method: 'get',
    url: `/api/chat?discussion=${discussionId}`,
  });

  return data.chats;
};

export const createChat = async (chat, discussionId) => {
  const {data} = await axios ({
    method: 'post',
    url: `/api/chat?discussion=${discussionId}`,
    data: JSON.stringify (chat),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};
