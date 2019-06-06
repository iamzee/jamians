import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
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
  hidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const QuestionPaperNav = props => {
  const {classes} = props;

  return (
    <AppBar position="fixed" color="default" className={classes.appbar}>
      <Toolbar>
        <Link className={classes.link} to="/question_papers">
          <DashboardIcon />
          <Button className={classes.hidden}>Dashboard</Button>
        </Link>

        <Link to="/question_papers/upload" className={classes.link}>
          <UploadIcon />
          <Button className={classes.hidden}>Upload</Button>
        </Link>

        <Link to="/question_papers/bookmarks" className={classes.link}>
          <BookmarksIcon />
          <Button className={classes.hidden}>Bookmarks</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(QuestionPaperNav);
