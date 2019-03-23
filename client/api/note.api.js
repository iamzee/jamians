import axios from 'axios';

export const createNote = note => {
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

export const listNotes = ({departmentId, courseId, subjectId}) => {
  if (subjectId) {
    return axios ({
      method: 'get',
      url: `/api/note/?department=${departmentId}&course=${courseId}&subject=${subjectId}`,
    }).then (({data}) => {
      return data.notes;
    });
  } else {
    return axios ({
      method: 'get',
      url: `/api/note/?department=${departmentId}&course=${courseId}`,
    }).then (({data}) => {
      return data.notes;
    });
  }
};

export const addBookmark = (userId, noteId) => {
  return axios ({
    method: 'post',
    url: '/api/note/addBookmark',
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

export const removeBookmark = (userId, noteId) => {
  return axios ({
    method: 'post',
    url: '/api/note/removeBookmark',
    data: JSON.stringify ({
      userId,
      noteId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then (({data}) => {
      console.log (data);
    })
    .catch (err => {
      console.log (err);
    });
};

export const getBookmarkedNotes = (token, userId) => {
  return axios ({
    method: 'get',
    url: '/api/note/bookmarks',
    data: JSON.stringify ({
      userId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then (({data}) => {
      return data.notes;
    })
    .catch (err => {
      console.log (err);
    });
};

export const read = noteId => {
  return axios ({
    methos: 'get',
    url: '/api/note/' + noteId,
  }).then (({data}) => {
    return data;
  });
};
