import axios from 'axios';

export const listSubjects = (courseId, semester) => {
  return axios ({
    method: 'get',
    url: `/api/subject?course=${courseId}&semester=${semester}`,
  }).then (({data}) => {
    return data.subjects;
  });
};
