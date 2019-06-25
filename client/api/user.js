import axios from 'axios';

export const create = async data => {
  try {
    await axios({
      method: 'post',
      url: '/api/users',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};
