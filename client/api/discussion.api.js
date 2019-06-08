import axios from 'axios';

export const newDiscussion = title => {
  return axios ({
    method: 'post',
    url: '/api/discussion',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify ({title}),
  });
};

export const listDiscussions = () => {
  return axios ({
    method: 'get',
    url: '/api/discussion',
  }).then (({data}) => {
    return data.discussions;
  });
};

export const readDiscussion = discussionId => {
  return axios ({
    method: 'get',
    url: '/api/discussion/' + discussionId,
  }).then (({data}) => {
    return data;
  });
};
