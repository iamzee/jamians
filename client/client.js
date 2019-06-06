import React from 'react';
import ReactDOM from 'react-dom';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import MainRouter from './routers/MainRouter';

const theme = createMuiTheme({
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
  questionPaper: {
    primary: '#522546',
    secondary: '#88304e',
    tertiary: '#e23e57',
  },
  chat: {
    primary: '#fff1c1',
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MainRouter />
  </MuiThemeProvider>,
  document.getElementById('root')
);
