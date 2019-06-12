import moment from 'moment';
import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  chatContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  chat: {
    display: 'inline-block',
    padding: theme.spacing.unit,
    background: theme.palette.tertiary,
  },
});

let date = '';

const renderDate = createdAt => {
  if (moment (createdAt).format ('Do MMM') === date) {
    return;
  } else {
    date = moment (createdAt).format ('Do MMM');
    return (
      <Paper
        style={{
          display: 'inline-block',
          padding: '8px',
          marginBottom: '16px',
          background: 'black',
          color: 'white',
        }}
      >
        <Typography variant="caption" color="inherit">
          {moment (createdAt).format ('Do MMM')}
        </Typography>
      </Paper>
    );
  }
};

const ChatListItem = ({chat, classes}) => {
  return (
    <div>
      {renderDate (chat.createdAt)}
      <div className={classes.chatContainer}>
        <Paper className={classes.chat}>
          <Typography variant="caption">
            {chat.createdBy.name} - {moment (chat.createdAt).format ('hh:mm a')}
          </Typography>
          <Typography variant="body2">{chat.text}</Typography>
        </Paper>
      </div>
    </div>
  );
};

export default withStyles (styles) (ChatListItem);
