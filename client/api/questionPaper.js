import axios from 'axios';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const createQuestionPaper = async (
  questionPaper,
  department,
  course,
  semester,
  subject
) => {
  try {
    return await axios ({
      method: 'post',
      url: `/api/questionPaper?department=${department}&course=${course}&semester=${semester}&subject=${subject}`,
      data: JSON.stringify (questionPaper),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e);
  }
};

export const listQuestionPapers = async ({
  department,
  course,
  semester,
  subject,
}) => {
  const url = `/api/questionPaper?department=${department || ''}&course=${course || ''}&semester=${semester || ''}&subject=${subject || ''}`;

  try {
    const {data} = await axios ({
      method: 'get',
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.questionPapers;
  } catch (e) {
    console.log (e.response);
  }
};

export const read = async id => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/questionPaper/${id}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log (e);
  }
};

export const addBookmark = async id => {
  try {
    return await axios ({
      method: 'post',
      url: `/api/questionPaper/${id}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e);
  }
};

export const removeBookmark = async id => {
  try {
    return await axios ({
      method: 'delete',
      url: `/api/questionPaper/${id}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e);
  }
};

export const getBookmarkedQuestionPapers = () => {
  return axios ({
    method: 'get',
    url: '/api/questionPaper/bookmarks',
  }).then (({data}) => {
    console.log (data);
    return data.questionPapers;
  });
};
