import axios from 'axios';

export const createEvent = (token, event) => {
  return axios ({
    method: 'post',
    url: '/api/event',
    data: event,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const listEvents = token => {
  return axios ({
    method: 'get',
    url: '/api/event',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    return data.events;
  });
};
