import axios from 'axios';

export const listTeachers = () => {
  return axios ({
    method: 'get',
    url: '/api/teacher',
  }).then (({data}) => {
    return data.teachers;
  });
};
