import axios from 'axios';

export const listSubjects = async (courseId, semester, token) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `/api/subject?course=${courseId}&semester=${semester}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.subjects;
  } catch (e) {
    console.log(e.response);
  }
};
