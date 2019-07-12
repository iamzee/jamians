import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  commentField: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#efefef',
    padding: theme.spacing(1),
  },
  textField: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

class ReplyForm extends React.Component {
  state = {
    reply: '',
    adding: false,
  };

  onReplyChange = e => {
    const reply = e.target.value;
    this.setState(() => ({reply}));
  };

  onSubmit = async () => {
    this.setState(() => ({adding: true}));
    const text = this.state.reply;
    this.props.addReply({text}, () => {
      this.setState(() => ({adding: false, reply: ''}));
    });
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
          value={this.state.reply}
          onChange={this.onReplyChange}
        />

        {this.state.adding ? (
          <CircularProgress color="primary" size={24} />
        ) : (
          <IconButton
            color="primary"
            disabled={!this.state.reply}
            onClick={this.onSubmit}
          >
            <SendIcon />
          </IconButton>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ReplyForm);
