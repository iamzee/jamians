import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated();

export const createEvent = async event => {
  try {
    const {data} = await axios({
      method: 'post',
      url: '/api/events',
      data: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (event.poster) {
      const bodyFormData = new FormData();
      bodyFormData.set('poster', event.poster);

      await axios({
        method: 'post',
        url: `/api/events/${data._id}/poster`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const listEvents = async skip => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `/api/events?skip=${skip}&limit=5`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.events;
  } catch (e) {
    console.log(e.response);
  }
};

export const readEvent = async eventId => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `/api/events/${eventId}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log(e.response);
  }
};

export const addComment = async (eventId, comment) => {
  try {
    const {data} = await axios({
      method: 'post',
      url: `/api/events/${eventId}/comments`,
      data: JSON.stringify(comment),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (e) {
    console.log(e.response);
  }
};

export const addReply = async (eventId, commentId, reply) => {
  try {
    const {data} = await axios({
      method: 'post',
      url: `/api/events/${eventId}/comments/${commentId}/reply`,
      data: JSON.stringify(reply),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log(e.response);
  }
};

// export const updateEvent = async (eventId, event) => {
//   console.log(event);
//   try {
//     await axios({
//       method: 'patch',
//       url: `/api/event/${eventId}`,
//       data: JSON.stringify(event),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//     });
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const addGoing = async (eventId, token) => {
//   try {
//     await axios({
//       method: 'post',
//       url: `/api/event/${eventId}/going`,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const removeGoing = async (eventId, token) => {
//   try {
//     await axios({
//       method: 'delete',
//       url: `/api/event/${eventId}/going`,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const addBookmark = async (eventId, token) => {
//   try {
//     await axios({
//       method: 'post',
//       url: `/api/event/${eventId}/bookmark`,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const removeBookmark = async (eventId, token) => {
//   try {
//     await axios({
//       method: 'delete',
//       url: `/api/event/${eventId}/bookmark`,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const addDiscussion = async (discussion, eventId, token) => {
//   try {
//     const {data} = await axios({
//       method: 'post',
//       url: `/api/event/${eventId}/discussion`,
//       data: JSON.stringify(discussion),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     return data;
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const listDiscussion = async (eventId, token) => {
//   try {
//     const {data} = await axios({
//       method: 'get',
//       url: `/api/event/${eventId}/discussion`,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     return data.discussions;
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const addComment = async (comment, eventId, discussionId, token) => {
//   try {
//     const {data} = await axios({
//       method: 'post',
//       url: `/api/event/${eventId}/discussion/${discussionId}/addComment`,
//       data: JSON.stringify(comment),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     return data;
//   } catch (e) {
//     console.log(e.response);
//   }
// };

// export const listComment = async (eventId, discussionId, token) => {
//   try {
//     const {data} = await axios({
//       method: 'get',
//       url: `/api/event/${eventId}/discussion/${discussionId}/addComment`,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     return data.comments;
//   } catch (e) {
//     console.log(e.response);
//   }
// };
