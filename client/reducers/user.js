import {isAuthenticated} from '../helpers/auth';

export default (
  state = isAuthenticated () ? isAuthenticated ().user : {},
  action
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
