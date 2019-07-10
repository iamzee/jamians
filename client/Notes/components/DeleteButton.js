import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DIalogTitle';

import {removeNote} from '../../api/notes';

class DeleteButton extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState (() => ({open: false}));
  };

  handleOpen = () => {
    this.setState (() => ({open: true}));
  };

  handleDelete = async () => {
    await removeNote (this.props.note._id);
    this.setState (() => ({open: false}));
    this.props.history.push ('/notes');
  };

  render () {
    const {open} = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen} color="secondary">Delete</Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure you want to delete this note?'}
          </DialogTitle>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
            <Button color="secondary" onClick={this.handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default DeleteButton;
