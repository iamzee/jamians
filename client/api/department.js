import axios from 'axios';

export const listDepartments = async token => {
  try {
    const {data} = await axios({
      method: 'get',
      url: '/api/department',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.departments;
  } catch (e) {
    console.log(e.response);
  }
};
