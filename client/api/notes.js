import axios from 'axios';

export const createNote = async (
  note,
  department,
  course,
  semester,
  subject,
  token
) => {
  try {
    return await axios({
      method: 'post',
      url: `/api/notes?department=${department}&course=${course}&semester=${semester}&subject=${subject}`,
      data: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const listNotes = async (
  {department, course, semester, subject},
  token
) => {
  const url = `/api/notes?department=${department || ''}&course=${course ||
    ''}&semester=${semester || ''}&subject=${subject || ''}`;

  try {
    const {data} = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.notes;
  } catch (e) {
    console.log(e.response);
  }
};

export const readNote = async (noteId, token) => {
  try {
    const {data} = await axios({
      methos: 'get',
      url: '/api/notes/' + noteId,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (e) {
    console.log(e.response);
  }
};

export const addBookmark = async (noteId, token) => {
  try {
    return await axios({
      method: 'post',
      url: `/api/notes/${noteId}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const removeBookmark = async (noteId, token) => {
  try {
    return await axios({
      method: 'delete',
      url: `/api/notes/${noteId}/bookmark`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const getBookmarkedNotes = () => {
  return axios({
    method: 'get',
    url: '/api/note/bookmarks',
  })
    .then(({data}) => {
      console.log('data', data);
      return data.notes;
    })
    .catch(err => {
      console.log(err);
    });
};
