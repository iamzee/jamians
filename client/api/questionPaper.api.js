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

export const listQuestionPapers = payload => {
  const {departmentId, courseId, subjectId, semester} = payload;
  let query = `department=${departmentId}&course=${courseId}`;

  if (subjectId && semester) {
    query = `department=${departmentId}&course=${courseId}&subject=${subjectId}&semester=${semester}`;
  } else if (subjectId) {
    query = `department=${departmentId}&course=${courseId}&subject=${subjectId}`;
  } else if (semester) {
    query = `department=${departmentId}&course=${courseId}&semester=${semester}`;
  }

  return axios ({
    method: 'get',
    url: `/api/questionPaper?${query}`,
  }).then (({data}) => {
    return data.questionPapers;
  });
};

export const readQuestionPaper = questionPaperId => {
  return axios ({
    method: 'get',
    url: '/api/questionPaper/' + questionPaperId,
  }).then (({data}) => {
    return data;
  });
};

export const addBookmark = (questionPaperId, userId) => {
  console.log (questionPaperId);
  console.log (userId);
  return axios ({
    method: 'post',
    url: '/api/questionPaper/' + questionPaperId,
    data: JSON.stringify ({
      type: 'ADD_BOOKMARK',
      data: {
        userId,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then (({data}) => {
      console.log (data);
      return data;
    })
    .catch (err => {
      console.log (err.response);
    });
};

export const removeBookmark = (questionPaperId, userId) => {
  return axios ({
    method: 'post',
    url: '/api/questionPaper/' + questionPaperId,
    data: JSON.stringify ({
      type: 'REMOVE_BOOKMARK',
      data: {
        userId,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (({data}) => {
    return data;
  });
};

export const getBookmarkedQuestionPapers = token => {
  return axios ({
    method: 'get',
    url: '/api/questionPaper/bookmarks',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    console.log (data);
    return data.questionPapers;
  });
};
