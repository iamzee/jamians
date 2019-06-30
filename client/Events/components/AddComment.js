import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

import {addComment} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';

const styles = theme => ({
  commentField: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

class AddComment extends React.Component {
  state = {
    comment: '',
    adding: false,
  };

  onCommentChange = e => {
    const comment = e.target.value;
    this.setState(() => ({comment}));
  };

  onSubmit = async () => {
    this.setState(() => ({adding: true}));
    const {token} = isAuthenticated();
    await addComment(
      {text: this.state.comment},
      this.props.discussion.event,
      this.props.discussion._id,
      token
    );
    this.setState(() => ({adding: false, comment: ''}));
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.commentField}>
        <Avatar>
          <PersonIcon />
        </Avatar>
        <TextField
          className={classes.textField}
          placeholder="Reply..."
          value={this.state.comment}
          onChange={this.onCommentChange}
        />

        {this.state.adding ? (
          <CircularProgress color="primary" size={24} />
        ) : (
          <IconButton
            color="primary"
            disabled={!this.state.comment}
            onClick={this.onSubmit}
          >
            <SendIcon />
          </IconButton>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AddComment);
