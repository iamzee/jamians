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

export const listEvents = async (skip, token) => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/event?skip=${skip}&limit=5`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.events;
  } catch (e) {
    console.log (e.response);
  }
};

export const updateEvent = async (eventId, event, token) => {
  console.log (event);
  try {
    await axios ({
      method: 'patch',
      url: `/api/event/${eventId}`,
      data: JSON.stringify (event),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const readEvent = async (eventId, token) => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/event/${eventId}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log (e.response);
  }
};

export const addGoing = async (eventId, token) => {
  try {
    await axios ({
      method: 'post',
      url: `/api/event/${eventId}/going`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const removeGoing = async (eventId, token) => {
  try {
    await axios ({
      method: 'delete',
      url: `/api/event/${eventId}/going`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const addBookmark = async (eventId, token) => {
  try {
    await axios ({
      method: 'post',
      url: `/api/event/${eventId}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const removeBookmark = async (eventId, token) => {
  try {
    await axios ({
      method: 'delete',
      url: `/api/event/${eventId}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const addDiscussion = async (discussion, eventId, token) => {
  try {
    const {data} = await axios ({
      method: 'post',
      url: `/api/event/${eventId}/discussion`,
      data: JSON.stringify (discussion),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log (e.response);
  }
};

export const listDiscussion = async (eventId, token) => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/event/${eventId}/discussion`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.discussions;
  } catch (e) {
    console.log (e.response);
  }
};

export const addComment = async (comment, eventId, discussionId, token) => {
  try {
    const {data} = await axios ({
      method: 'post',
      url: `/api/event/${eventId}/discussion/${discussionId}/addComment`,
      data: JSON.stringify (comment),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log (e.response);
  }
};

export const listComment = async (eventId, discussionId, token) => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/event/${eventId}/discussion/${discussionId}/addComment`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.comments;
  } catch (e) {
    console.log (e.response);
  }
};
