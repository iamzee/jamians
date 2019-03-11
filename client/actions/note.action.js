import axios from 'axios';

const getNotes = notes => ({
  type: 'GET_NOTES',
  notes,
});

export const startGetNotes = () => {
  return dispatch => {
    return axios ({
      method: 'get',
      url: '/api/note',
    }).then (({data}) => {
      dispatch (getNotes (data.notes));
    });
  };
};

const getFilteredNotes = notes => ({
  type: 'GET_FILTERED_NOTES',
  notes,
});

export const startGetFilteredNotes = subjectId => {
  return dispatch => {
    return axios ({
      method: 'get',
      url: `/api/note?subject=${subjectId}`,
    }).then (({data}) => {
      dispatch (getFilteredNotes (data.notes));
    });
  };
};
