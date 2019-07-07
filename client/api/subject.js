import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const listSubjects = async (courseId, semester) => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/subject?course=${courseId}&semester=${semester}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.subjects;
  } catch (e) {
    console.log (e.response);
  }
};
