import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
    color: '#fff',
  },
  appbar: {
    backgroundColor: theme.home.primary,
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
      backgroundColor: theme.home.secondary,
    },
  },
  listTitle: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.home.primary,
  },
  listTitleText: {
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
  },
  navButton: {
    color: '#fff',
  },
});

class Navbar extends React.Component {
  state = {
    open: false,
    redirectToSignup: false,
    redirectToLogin: false,
  };

  toggleDrawer = open => () => {
    this.setState (() => ({open}));
  };

  onSignupClick = () => {
    this.setState (() => ({redirectToSignup: true}));
  };

  onLoginClick = () => {
    this.setState (() => ({redirectToLogin: true}));
  };

  render () {
    const {classes} = this.props;

    if (this.state.redirectToSignup) {
      return <Redirect to="/signup" />;
    } else if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
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
                Jamians
              </Typography>
              <Button
                className={classes.navButton}
                onClick={this.onSignupClick}
              >
                Signup
              </Button>
              <Button className={classes.navButton} onClick={this.onLoginClick}>
                Login
              </Button>
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
                    Jamians
                  </Typography>
                </div>

                <Divider variant="middle" />
                <List>

                  <Link to="/notes" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <ListItemText primary={'Notes'} />
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
