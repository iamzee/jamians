import axios from 'axios';

export const createNote = note => {
  console.log (note);
  return axios ({
    method: 'post',
    url: '/api/note',
    data: JSON.stringify (note),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (({data}) => {
    return data;
  });
};

export const listNotes = () => {
  return axios ({
    method: 'get',
    url: '/api/note',
  }).then (({data}) => {
    return data.notes;
  });
};

export const getFilteredNotes = subjectId => {
  return axios ({
    method: 'get',
    url: `/api/note?subject=${subjectId}`,
  }).then (({data}) => {
    return data.notes;
  });
};

export const addBookmark = (userId, noteId) => {
  return axios ({
    methos: 'post',
    url: '/api/note/bookmark',
    data: JSON.stringify ({
      userId,
      noteId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then (doc => {
      console.log (doc);
    })
    .catch (err => {
      console.log (err);
    });
};
