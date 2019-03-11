import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth.reducer';
import notesReducer from '../reducers/note.reducer';

export default () => {
  const store = createStore (
    combineReducers ({
      auth: authReducer,
      notes: notesReducer,
    }),
    applyMiddleware (thunk)
  );

  store.subscribe (() => {
    console.log (store.getState ());
  });

  return store;
};
