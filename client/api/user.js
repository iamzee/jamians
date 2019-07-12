import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated();

export const createUser = async user => {
  try {
    const {data} = await axios({
      method: 'post',
      url: '/api/users',
      data: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (user.avatar) {
      const bodyFormData = new FormData();
      bodyFormData.set('avatar', user.avatar);
      await axios({
        method: 'post',
        url: `/api/users/${data._id}/avatar`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    return data;
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

export const updateUser = async (userId, payload) => {
  try {
    // return await axios({
    //   method: 'patch',
    //   url: `/api/users/${userId}`,
    //   data: JSON.stringify(payload),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + token,
    //   },
    // });
    // if (payload.avatar) {
    //   return await
    // }
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

export const me = async () => {
  try {
    const {data} = await axios({
      method: 'get',
      url: '/api/users/me',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log(e.response);
  }
};
