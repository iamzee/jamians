import axios from 'axios';

export const createEvent = async (event, token) => {
  try {
    await axios ({
      method: 'post',
      url: '/api/event',
      data: JSON.stringify (event),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e);
  }
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

export const getBookmarks = () => {
  return axios ({
    method: 'get',
    url: '/api/event/bookmarks',
  }).then (({data}) => {
    return data.events;
  });
};

export const updateEvent = (eventId, payload) => {
  return axios ({
    method: 'post',
    url: `/api/event/${eventId}`,
    data: JSON.stringify (payload),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (({data}) => {
    return data;
  });
};

export const readEvent = eventId => {
  console.log ('EVENT_ID', eventId);
  return axios ({
    mrthod: 'get',
    url: `/api/event/${eventId}`,
  }).then (({data}) => {
    return data;
  });
};
