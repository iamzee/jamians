import axios from 'axios';

const signup = data => ({
  type: 'SIGNUP',
  data,
});

export const startSignup = user => {
  return dispatch => {
    axios ({
      method: 'post',
      url: '/api/user',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify (user),
    })
      .then (({data}) => {
        dispatch (signup (data));
      })
      .catch (err => {
        console.log (err.response);
      });
  };
};
