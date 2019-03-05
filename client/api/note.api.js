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
