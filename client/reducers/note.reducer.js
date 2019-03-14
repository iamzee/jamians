export default (state = [], action) => {
  switch (action.type) {
    case 'GET_NOTES': {
      return action.notes;
    }
    case 'GET_FILTERED_NOTES': {
      return action.notes;
    }
    case 'ADD_BOOKMARK': {
      return state.map (note => {
        if (note._id === action.noteId) {
          note.bookmarks.push (action.userId);
          return note;
        } else {
          return note;
        }
      });
    }
    default: {
      return state;
    }
  }
};
