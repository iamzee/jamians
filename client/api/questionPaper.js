import axios from 'axios';
import _ from 'lodash';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const createQuestionPaper = async data => {
  try {
    const bodyFormData = new FormData ();
    const keys = _.keys (data);

    keys.forEach (key => {
      bodyFormData.append (key, data[key]);
    });

    const questionPaper = await axios ({
      method: 'post',
      url: `/api/questionPaper`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    return questionPaper;
  } catch (e) {
    console.log (e.response);
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

export const getBookmarkedQuestionPapers = async () => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: '/api/questionPaper/bookmark',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.questionPapers;
  } catch (e) {
    console.log (e.response);
  }
};
