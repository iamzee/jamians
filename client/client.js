import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import createStore from './store/store.config';

import {startLogin} from './actions/auth.action';

const store = createStore ();

store.dispatch (
  startLogin ({
    email: 'messi@gmail.com',
    password: 'antonella',
  })
);

ReactDOM.render (<App />, document.getElementById ('root'));
