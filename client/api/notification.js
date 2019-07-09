import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const createNotification = async notification => {
  try {
    return await axios ({
      method: 'post',
      url: '/api/notification',
      data: JSON.stringify (notification),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const listNotifications = async () => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: '/api/notification',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.notifications;
  } catch (e) {
    console.log (e);
  }
};

export const markSeen = async id => {
  try {
    return await axios ({
      method: 'patch',
      url: `/api/notification/${id}`,
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    console.log (e);
  }
};

export const countUnseen = async () => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: '/api/notification/count',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.count;
  } catch (e) {
    console.log (e);
  }
};
