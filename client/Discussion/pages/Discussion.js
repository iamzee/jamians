import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import {readDiscussion} from '../../api/discussion.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import ChatListItem from '../components/ChatListItem';
import ChatInput from '../components/ChatInput';
import Navbar from '../../components/Navbar';
import DiscussionNav from '../components/DiscussionNav';

let socket = '';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing.unit * 15,
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
  title: {
    fontWeight: 300,
  },
});

class Discussion extends React.Component {
  state = {
    discussion: null,
    date: '',
  };

  componentDidMount () {
    const {discussionId} = this.props.match.params;

    readDiscussion (discussionId).then (discussion => {
      this.setState (() => ({discussion}));
      window.scrollTo (0, document.body.scrollHeight);
    });

    socket = io ('http://localhost:3000');

    console.log (discussionId);
    socket.emit ('joinRoom', discussionId);

    socket.on ('messageToClients', message => {
      this.setState (() => ({
        discussion: {
          ...this.state.discussion,
          chats: [...this.state.discussion.chats, message],
        },
      }));
      window.scrollTo (0, document.body.scrollHeight);
    });
  }

  componentWillUnmount () {
    socket.close ();
  }

  render () {
    const {discussion} = this.state;
    const {classes} = this.props;
    return (
      <div>

        <Navbar title={'Discussions'} />
        <DiscussionNav />

        <div className={classes.container}>

          <Typography className={classes.title} variant="h4" gutterBottom>
            {discussion && discussion.title}
          </Typography>

          <Divider />

          <ChatInput socket={socket} />
          <div id="chat-list" className={classes.chatList}>
            {discussion &&
              discussion.chats.map (c => {
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

export default withStyles (styles) (Discussion);
