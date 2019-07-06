import axios from 'axios';

export const create = async user => {
  console.log(user);
  try {
    return await axios({
      method: 'post',
      url: '/api/users',
      data: JSON.stringify(user),
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

export const updateUser = async (userId, payload, token) => {
  try {
    return await axios({
      method: 'patch',
      url: `/api/users/${userId}`,
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
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

export const removeFriendRequest = async (userId, token) => {
  try {
    return await axios({
      method: 'delete',
      url: `/api/users/${userId}/friendRequest`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const addFriend = async (userId, token) => {
  try {
    return await axios({
      method: 'post',
      url: `/api/users/${userId}/friend`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const removeFriend = async (userId, token) => {
  try {
    return await axios({
      method: 'delete',
      url: `/api/users/${userId}/friend`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};
