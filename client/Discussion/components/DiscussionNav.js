import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import NewEventIcon from '@material-ui/icons/AddOutlined';
import BookmarksIcon from '@material-ui/icons/BookmarksOutlined';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {
    marginTop: theme.spacing.unit * 7,
    paddingLeft: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit,
    color: 'black',
    [theme.breakpoints.down ('xs')]: {
      marginRight: theme.spacing.unit * 2,
    },
  },
  hide: {
    [theme.breakpoints.down ('xs')]: {
      display: 'none',
    },
  },
});

const DiscussionNav = props => {
  const {classes} = props;

  return (
    <AppBar position="fixed" color="default" className={classes.appbar}>
      <Toolbar>
        <Link className={classes.link} to="/discussion">
          <DashboardIcon />
          <Button className={classes.hide}>Dashboard</Button>
        </Link>

        <Link to="/discussion/new" className={classes.link}>
          <NewEventIcon />
          <Button className={classes.hide}>New</Button>
        </Link>

        {/* <Link to="/events/bookmarks" className={classes.link}>
          <BookmarksIcon />
          <Button className={classes.hide}>Bookmarks</Button>
        </Link> */}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles (styles) (DiscussionNav);
