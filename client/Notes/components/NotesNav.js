import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import NotesIcon from '@material-ui/icons/NotesOutlined';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import BookmarksIcon from '@material-ui/icons/BookmarksOutlined';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {
    marginTop: theme.spacing.unit * 7,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
    color: 'black',
  },
});

const NotesNav = props => {
  const {classes} = props;

  return (
    <AppBar position="fixed" color="default" className={classes.appbar}>
      <Toolbar>
        <Link className={classes.link} to="/notes">
          <NotesIcon />
          <Button>Notes</Button>
        </Link>

        <Link to="/notes/upload" className={classes.link}>
          <UploadIcon />
          <Button>Upload</Button>
        </Link>

        <Link to="/notes/bookmarks" className={classes.link}>
          <BookmarksIcon />
          <Button>Bookmarks</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NotesNav);
