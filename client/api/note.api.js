import axios from 'axios';

export const createNote = note => {
  return axios({
    method: 'post',
    url: '/api/note',
    data: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({data}) => {
    return data;
  });
};

export const listNotes = ({department, course, semester, subject}) => {
  const url = `/api/note?department=${department || ''}&course=${course ||
    ''}&semester=${semester || ''}&subject=${subject || ''}`;
  console.log(url);
  return axios({
    method: 'get',
    url,
  }).then(({data}) => {
    console.log(data.notes);
    return data.notes;
  });
};

export const addBookmark = (userId, noteId) => {
  return axios({
    method: 'post',
    url: '/api/note/addBookmark',
    data: JSON.stringify({
      userId,
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

export const removeBookmark = (userId, noteId) => {
  return axios({
    method: 'post',
    url: '/api/note/removeBookmark',
    data: JSON.stringify({
      userId,
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

export const getBookmarkedNotes = (token, userId) => {
  return axios({
    method: 'get',
    url: '/api/note/bookmarks',
    data: JSON.stringify({
      userId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(({data}) => {
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
