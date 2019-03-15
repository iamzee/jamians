import React from 'react';
import ReactDOM from 'react-dom';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
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
  },
  notes: {
    primary: '#222831',
    secondary: '#393e46',
    tertiary: '#00adb5',
    quaternary: '#eeeeee',
  },
  home: {
    primary: '#1fab89',
    secondary: '#d7fbe8',
  },
  typography: {
    useNextVariants: true,
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
