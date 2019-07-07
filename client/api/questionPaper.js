import axios from 'axios';

export const createQuestionPaper = data => {
  return axios({
    method: 'post',
    url: '/api/questionPaper',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({data}) => {
    return data;
  });
};

export const listQuestionPapers = ({department, course, semester, subject}) => {
  const url = `/api/questionPaper?department=${department ||
    ''}&course=${course || ''}&semester=${semester || ''}&subject=${subject ||
    ''}`;
  return axios({
    method: 'get',
    url,
  }).then(({data}) => {
    console.log(data.questionPapers);
    return data.questionPapers;
  });
};

export const readQuestionPaper = questionPaperId => {
  return axios({
    method: 'get',
    url: '/api/questionPaper/' + questionPaperId,
  }).then(({data}) => {
    return data;
  });
};

export const addBookmark = questionPaperId => {
  return axios({
    method: 'post',
    url: '/api/questionPaper/' + questionPaperId,
    data: JSON.stringify({
      type: 'ADD_BOOKMARK',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const removeBookmark = questionPaperId => {
  return axios({
    method: 'post',
    url: '/api/questionPaper/' + questionPaperId,
    data: JSON.stringify({
      type: 'REMOVE_BOOKMARK',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({data}) => {
    return data;
  });
};

export const getBookmarkedQuestionPapers = () => {
  return axios({
    method: 'get',
    url: '/api/questionPaper/bookmarks',
  }).then(({data}) => {
    console.log(data);
    return data.questionPapers;
  });
};
