import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const listDepartments = async () => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: '/api/department',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.departments;
  } catch (e) {
    console.log (e.response);
  }
};
