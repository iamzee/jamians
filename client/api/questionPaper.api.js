import axios from 'axios';

export const createQuestionPaper = data => {
  return axios ({
    method: 'post',
    url: '/api/questionPaper',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (({data}) => {
    return data;
  });
};
