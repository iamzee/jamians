import React from 'react';
import ReactDOM from 'react-dom';

import './client.scss';
import MainRouter from './routers/MainRouter';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
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

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
