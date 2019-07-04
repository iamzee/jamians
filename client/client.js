import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './store/configStore';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';

import MainRouter from './routers/MainRouter';
import './client.scss';
import {startSetUser} from './actions/user';
import {isAuthenticated} from './helpers/auth';

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

store.dispatch (startSetUser (isAuthenticated ().token)).then (() => {
  ReactDOM.render (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MainRouter />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById ('root')
  );
});
