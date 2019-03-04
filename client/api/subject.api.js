import axios from 'axios';

export const listSubjects = () => {
  return axios ({
    method: 'get',
    url: '/api/subject',
  }).then (({data}) => {
    return data.subjects;
  });
};
