import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {isAuthenticated} from '../../helpers/auth.helper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 5,
  },
  grow: {
    flexGrow: 1,
    color: '#fff',
  },
  appbar: {
    backgroundColor: theme.questionPaper.primary,
  },
  iconButton: {
    marginRight: theme.spacing.unit,
    color: '#fff',
  },
  list: {
    width: 250,
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.questionPaper.tertiary,
      color: '#fff',
    },
  },
  listTitle: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.questionPaper.primary,
  },
  listTitleText: {
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
  },
});

class Navbar extends React.Component {
  state = {
    open: false,
    redirectToHome: false,
    department: '',
    course: '',
  };

  componentDidMount () {
    const {user} = isAuthenticated ();

    this.setState (() => ({
      department: user.department._id,
      course: user.course._id,
    }));
  }

  toggleDrawer = open => () => {
    this.setState (() => ({open}));
  };

  onHomeClick = () => {
    this.setState (() => ({redirectToHome: true}));
  };

  render () {
    const {classes} = this.props;

    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
              <IconButton
                className={classes.iconButton}
                onClick={this.toggleDrawer (true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.grow}>
                Question Papers
              </Typography>
              <IconButton
                className={classes.iconButton}
                onClick={this.onHomeClick}
              >
                <HomeIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Drawer open={this.state.open} onClose={this.toggleDrawer (false)}>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={this.toggleDrawer (false)}
              onClick={this.toggleDrawer (false)}
            >
              <div className={classes.list}>
                <div className={classes.listTitle}>
                  <Typography variant="h5" className={classes.listTitleText}>
                    Question Papers
                  </Typography>
                </div>

                <Divider variant="middle" />
                <List>

                  <Link
                    to={`/question_papers?departmentId=${this.state.department}&courseId=${this.state.course}`}
                    className={classes.link}
                  >
                    <ListItem button className={classes.listItem}>
                      <ListItemText primary={'Question Papers'} />
                    </ListItem>
                  </Link>

                  <Link to="/question_papers/upload" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <ListItemText primary={'Upload'} />
                    </ListItem>
                  </Link>

                  <Link
                    to="/question_papers/bookmarks"
                    className={classes.link}
                  >
                    <ListItem button className={classes.listItem}>
                      <ListItemText primary={'Bookmarks'} />
                    </ListItem>
                  </Link>

                </List>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (Navbar);
