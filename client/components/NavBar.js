import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AccountButton from './AccountButton';

const styles = them => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

const NavBar = props => {
  const {classes, title} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            {title}
          </Typography>
          {/* <AccountButton /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles (styles) (NavBar);
