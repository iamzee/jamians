import axios from 'axios';

export const listCourses = async departmentId => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `/api/course?department=${departmentId}`,
    });
    return data.courses;
  } catch (e) {
    console.log(e.response);
  }
};
