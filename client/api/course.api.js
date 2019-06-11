import axios from 'axios';

export const listCourses = departmentId => {
  return axios ({
    method: 'get',
    url: `/api/course?department=${departmentId}`,
  }).then (({data}) => {
    return data.courses;
  });
};
