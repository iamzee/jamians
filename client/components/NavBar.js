import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountButton from './AccountButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  iconButton: {
    marginRight: theme.spacing.unit,
  },
});

const NavBar = props => {
  const {classes, title} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton className={classes.iconButton}>
            <MenuIcon />
          </IconButton>
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
