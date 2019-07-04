import axios from 'axios';

export const setUser = user => ({
  type: 'SET_USER',
  user,
});

export const startSetUser = token => {
  return async dispatch => {
    const {data} = await axios ({
      method: 'get',
      url: '/api/users/me',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    dispatch (setUser (data));
  };
};
