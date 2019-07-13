import axios from 'axios';
import _ from 'lodash';
import {isAuthenticated} from '../helpers/auth';
const {token} = isAuthenticated ();

export const createNote = async data => {
  try {
    const bodyFormData = new FormData ();
    const keys = _.keys (data);

    keys.forEach (key => {
      bodyFormData.append (key, data[key]);
    });

    const note = await axios ({
      method: 'post',
      url: `/api/notes`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });

    return note;
  } catch (e) {
    console.log (e.response);
  }
};

export const listNotes = async ({department, course, semester, subject}) => {
  const url = `/api/notes?department=${department || ''}&course=${course || ''}&semester=${semester || ''}&subject=${subject || ''}`;

  try {
    const {data} = await axios ({
      method: 'get',
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.notes;
  } catch (e) {
    console.log (e.response);
  }
};

export const readNote = async noteId => {
  try {
    const {data} = await axios ({
      methos: 'get',
      url: '/api/notes/' + noteId,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log (e.response);
  }
};

export const removeNote = async id => {
  try {
    return await axios ({
      method: 'delete',
      url: `/api/notes/${id}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const addBookmark = async noteId => {
  try {
    return await axios ({
      method: 'post',
      url: `/api/notes/${noteId}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const removeBookmark = async noteId => {
  try {
    return await axios ({
      method: 'delete',
      url: `/api/notes/${noteId}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log (e.response);
  }
};

export const getBookmarkedNotes = async () => {
  try {
    const {data} = await axios ({
      method: 'get',
      url: `/api/notes/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.notes;
  } catch (e) {
    console.log (e.response);
  }
};
