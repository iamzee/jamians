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
    .catch (err => {
      return err.response.data;
    });
};

export const signup = user => {
  return axios ({
    method: 'post',
    url: '/api/user',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify (user),
  })
    .then (({data}) => {
      return data;
    })
    .catch (err => {
      return err.response.data;
    });
};
