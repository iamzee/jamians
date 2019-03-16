import axios from 'axios';

export const listDepartments = () => {
  return axios ({
    method: 'get',
    url: '/api/department',
  }).then (({data}) => {
    return data.departments;
  });
};

export const readDepartment = departmentId => {
  return axios ({
    method: 'get',
    url: '/api/department/' + departmentId,
  })
    .then (({data}) => {
      console.log (data);
      return data;
    })
    .catch (err => {
      console.log (err);
    });
};
