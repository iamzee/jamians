import axios from 'axios';

export const readUser = userId => {
  return axios ({
    method: 'get',
    url: '/api/user/' + userId,
  })
    .then (({data}) => {
      return data;
    })
    .catch (err => {
      console.log (err);
    });
};
