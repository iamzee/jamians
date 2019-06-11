import axios from 'axios';

export const listDepartments = () => {
  return axios ({
    method: 'get',
    url: '/api/department',
  }).then (({data}) => {
    return data.departments;
  });
};
