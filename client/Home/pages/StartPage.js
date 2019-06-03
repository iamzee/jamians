import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {background: theme.home.primary},
  title: {flexGrow: 1},
  link: {textDecoration: 'none', color: 'white'},
});

const StartPage = props => {
  const {classes} = props;
  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jamian Rivets
          </Typography>
          <Button color="inherit">
            <a className={classes.link} href="/auth/google">
              Login with Google
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles (styles) (StartPage);
