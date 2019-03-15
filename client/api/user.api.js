import axios from 'axios';

export const read = userId => {
  return axios ({
    method: 'get',
    url: '/api/user/:' + userId,
  }).then (({data}) => {
    return data;
  });
};
