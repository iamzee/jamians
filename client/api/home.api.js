import axios from 'axios';

export const countUsers = () => {
  return axios ({
    method: 'get',
    url: '/api/user/count',
  }).then (({data}) => {
    return data.count;
  });
};

export const countNotes = () => {
  return axios ({
    method: 'get',
    url: '/api/note/count',
  }).then (({data}) => {
    return data.count;
  });
};

export const countQuestionPapers = () => {
  return axios ({
    method: 'get',
    url: '/api/questionPaper/count',
  }).then (({data}) => {
    return data.count;
  });
};
