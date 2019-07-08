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
        'Content-Type': 'application//json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};
