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

export const addBookmark = noteId => {
  return axios({
    method: 'post',
    url: '/api/note/addBookmark',
    data: JSON.stringify({
      noteId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

export const removeBookmark = noteId => {
  return axios({
    method: 'post',
    url: '/api/note/removeBookmark',
    data: JSON.stringify({
      noteId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(({data}) => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
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

export const readNote = noteId => {
  return axios({
    methos: 'get',
    url: '/api/note/' + noteId,
  }).then(({data}) => {
    return data;
  });
};
