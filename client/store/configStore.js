import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (
  combineReducers ({user: userReducer}),
  composeEnhancers (applyMiddleware (thunk))
);

store.subscribe (() => console.log (store.getState ()));

export default store;
