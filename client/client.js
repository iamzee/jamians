import React from 'react';
import ReactDOM from 'react-dom';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Provider} from 'react-redux';

import MainRouter from './routers/MainRouter';
import createStore from './store/store.config';

const store = createStore ();

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#35234b',
    },
    secondary: {
      main: '#774898',
    },
    typography: {
      useNextVariants: true,
    },
  },
});

ReactDOM.render (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById ('root')
);
