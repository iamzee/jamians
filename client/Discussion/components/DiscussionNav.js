import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/ListOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
    color: 'black',
  },
});

const DiscussionNav = props => {
  const {classes} = props;
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link className={classes.link} to="/discussion">
          <ListIcon />
          <Button>Discussions</Button>
        </Link>
        <Link className={classes.link} to="/discussion/new">
          <AddIcon />
          <Button>New Discussion</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles (styles) (DiscussionNav);
