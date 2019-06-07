import axios from 'axios';

export const createEvent = event => {
  return axios ({
    method: 'post',
    url: '/api/event',
    data: event,
    headers: {
      'Content-Type': 'application/json',
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

export const addBookmark = eventId => {
  return axios ({
    method: 'post',
    url: '/api/event/addBookmark',
    data: JSON.stringify ({eventId}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (doc => {
    return doc;
  });
};

export const removeBookmark = eventId => {
  return axios ({
    method: 'post',
    url: '/api/event/removeBookmark',
    data: JSON.stringify ({eventId}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (doc => {
    return doc;
  });
};
