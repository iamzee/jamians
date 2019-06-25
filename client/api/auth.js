import axios from 'axios';
import {authenticate} from '../helpers/auth';

export const login = async user => {
  try {
    const {data} = await axios({
      method: 'post',
      url: '/api/login',
      data: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    authenticate(data.token);
  } catch (e) {
    return e.response.data.error;
  }
};
