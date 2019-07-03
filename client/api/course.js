import axios from 'axios';

export const listCourses = async (departmentId, token) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `/api/course?department=${departmentId}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.courses;
  } catch (e) {
    console.log(e.response);
  }
};
