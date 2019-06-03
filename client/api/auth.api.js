import axios from 'axios';

export const isAuthenticated = () => {
  return axios ({
    method: 'get',
    url: '/api/current_user',
  }).then (({data}) => {
    if (data) {
      return true;
    }
    return false;
  });
};
