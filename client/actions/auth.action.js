import axios from 'axios';

const login = data => ({
  type: 'LOGIN',
  data,
});

export const startLogin = user => {
  return dispatch => {
    axios ({
      method: 'post',
      url: '/api/login',
      data: JSON.stringify (user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then (({data}) => {
        dispatch (login (data));
      })
      .catch (err => {});
  };
};
