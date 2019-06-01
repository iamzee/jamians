import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {readDiscussion} from '../../api/discussion.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import ChatListItem from '../components/ChatListItem';
import ChatInput from '../components/ChatInput';

let socket = '';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
    // background: '#eee',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
  },
  chatList: {
    // width: '100vw',
    // height: '90vh',
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 15,
  },
});

class Discussion extends React.Component {
  state = {
    discussion: null,
    date: '',
  };

  componentDidMount() {
    const {token} = isAuthenticated();
    const {discussionId} = this.props.match.params;

    readDiscussion(token, discussionId).then(discussion => {
      this.setState(() => ({discussion}));
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket = io('http://localhost:3000');

    console.log(discussionId);
    socket.emit('joinRoom', discussionId);

    socket.on('messageToClients', message => {
      this.setState(() => ({
        discussion: {
          ...this.state.discussion,
          chats: [...this.state.discussion.chats, message],
        },
      }));
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    const {discussion} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">
              {discussion && discussion.title}
            </Typography>
            <Typography>{discussion && discussion.createdBy.name}</Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.container}>
          <ChatInput socket={socket} />
          <div id="chat-list" className={classes.chatList}>
            {discussion &&
              discussion.chats.map(c => {
                return (
                  <div key={c._id}>
                    <ChatListItem chat={c} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Discussion);
