import axios from 'axios';

export const listDepartments = async () => {
  try {
    const {data} = await axios({
      method: 'get',
      url: '/api/department',
    });
    return data.departments;
  } catch (e) {
    console.log(e);
  }
};
