import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {withStyles} from '@material-ui/core/styles';

import HomePageNav from '../components/HomePageNav';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  nav: {
    marginTop: theme.spacing.unit * 5,
  },
});

class HomePage extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = e => {
    this.setState (() => ({anchorEl: e.currentTarget}));
  };

  handleClose = () => {
    this.setState (() => ({anchorEl: null}));
  };

  render () {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean (anchorEl);

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" className={classes.grow}>
                Jamians
              </Typography>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  transformOrigin={{vertical: 'top', horizontal: 'right'}}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div className={classes.nav}>
          <HomePageNav
            title={'Notes Mania'}
            quote={
              'If you are afraid to fail then you are probably going to fail'
            }
            author={'Kobe Bryant'}
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (HomePage);
