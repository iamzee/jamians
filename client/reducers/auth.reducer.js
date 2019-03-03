export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.data;
    }
    case 'SIGNUP': {
      return action.data;
    }
    default: {
      return state;
    }
  }
};
