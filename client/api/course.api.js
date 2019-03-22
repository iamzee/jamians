import axios from 'axios';

export const readCourse = courseId => {
  return axios ({
    method: 'get',
    url: '/api/course/' + courseId,
  }).then (({data}) => {
    return data;
  });
};
