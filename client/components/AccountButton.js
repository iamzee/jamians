import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class AccountButton extends React.Component {
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
    const {anchorEl} = this.state;
    const open = Boolean (anchorEl);

    return (
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
    );
  }
}

export default AccountButton;
