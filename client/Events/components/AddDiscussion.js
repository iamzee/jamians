import React from 'react';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth';
import {addDiscussion} from '../../api/event';
import SnackbarComponent from '../../components/SnackbarComponent';

const styles = theme => ({
  paper: {
    padding: theme.spacing (2),
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing (2),
    backgroundColor: '#efefef',
  },
  textField: {
    flex: 1,
    marginLeft: theme.spacing (2),
  },
});

class AddDiscussion extends React.Component {
  state = {
    text: '',
    adding: false,
    done: false,
  };

  onTextChange = e => {
    const text = e.target.value;
    this.setState (() => ({text}));
  };

  onSnackbarClose = () => {
    this.setState (() => ({done: false}));
  };

  onSubmit = async () => {
    this.setState (() => ({adding: true}));
    const {text} = this.state;

    const eventId = this.props.event._id;

    this.props.onSubmit ({text}, eventId);
    this.setState (() => ({adding: false, text: '', done: true}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <TextField
            className={classes.textField}
            value={this.state.text}
            onChange={this.onTextChange}
            placeholder="Comment or Ask Something..."
          />
          {this.state.adding
            ? <CircularProgress size={24} />
            : <IconButton
                disabled={!this.state.text}
                color="primary"
                onClick={this.onSubmit}
              >
                <SendIcon />
              </IconButton>}
        </Paper>
        {this.state.done &&
          <SnackbarComponent
            variant="success"
            message="Discussion added."
            onClose={this.onSnackbarClose}
          />}
      </div>
    );
  }
}

export default withStyles (styles) (AddDiscussion);
