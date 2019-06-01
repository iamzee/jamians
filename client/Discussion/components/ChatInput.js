import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth.helper';

const styles = theme => ({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '2px solid black',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '95%',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  textfield: {
    width: '100%',
    flexGrow: 1,
    marginRight: theme.spacing.unit,
  },
});

class ChatInput extends React.Component {
  state = {
    message: '',
  };

  onMessageChange = e => {
    const message = e.target.value;
    this.setState(() => ({message}));
  };

  handleSubmit = () => {
    const message = {
      text: this.state.message,
      createdBy: isAuthenticated().user._id,
    };

    this.props.socket.emit('messageToServer', message);
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.inputContainer}>
        <TextField
          value={this.state.message}
          onChange={this.onMessageChange}
          className={classes.textfield}
          variant="outlined"
          placeholder="Type message..."
        />
        <Button variant="contained" onClick={this.handleSubmit}>
          Send
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ChatInput);
