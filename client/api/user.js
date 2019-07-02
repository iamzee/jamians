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

export const listUsers = async token => {
  try {
    const {data} = await axios({
      method: 'get',
      url: '/api/users',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.users;
  } catch (e) {}
};

export const readUser = async (userId, token) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `/api/users/${userId}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.response);
  }
};

export const sendFriendRequest = async (userId, token) => {
  try {
    return await axios({
      method: 'post',
      url: `/api/users/${userId}/friendRequest`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};
