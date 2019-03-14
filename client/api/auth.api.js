import axios from 'axios';

export const login = user => {
  return axios ({
    method: 'post',
    url: '/api/login',
    data: JSON.stringify (user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then (({data}) => {
      return data;
    })
    .catch (err => {});
};
