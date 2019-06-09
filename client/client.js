import React from 'react';
import ReactDOM from 'react-dom';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';

import MainRouter from './routers/MainRouter';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: lightBlue[700],
    },
    tertiary: cyan[200],
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render (
  <MuiThemeProvider theme={theme}>
    <MainRouter />
  </MuiThemeProvider>,
  document.getElementById ('root')
);
