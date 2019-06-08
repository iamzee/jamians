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

export const listDiscussions = token => {
  return axios ({
    method: 'get',
    url: '/api/discussion',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    return data.discussions;
  });
};

export const readDiscussion = (token, discussionId) => {
  return axios ({
    method: 'get',
    url: '/api/discussion/' + discussionId,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    return data;
  });
};
