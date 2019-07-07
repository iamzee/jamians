import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const listCourses = async departmentId => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/course?department=${departmentId}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.courses;
  } catch (e) {
    console.log (e.response);
  }
};
