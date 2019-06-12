import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

// import {readDiscussion} from '../../api/discussion.api';
import {listChat} from '../../api/chat.api';
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
    chats: [],
    date: '',
  };

  componentDidMount = async () => {
    const {discussionId} = this.props.match.params;

    // readDiscussion (discussionId).then (discussion => {
    //   this.setState (() => ({discussion}));
    //   window.scrollTo (0, document.body.scrollHeight);
    // });

    const chats = await listChat (discussionId);
    this.setState (() => ({chats}));

    socket = io ('http://localhost:3000');

    // console.log (discussionId);
    socket.emit ('joinRoom', discussionId);

    socket.on ('messageToClients', message => {
      this.setState (() => ({chats: [...this.state.chats, message]}));
      window.scrollTo (0, document.body.scrollHeight);
    });
  };

  componentWillUnmount () {
    socket.close ();
  }

  emitMessageToServer = message => {
    socket.emit ('messageToServer', message);
  };

  render () {
    const {chats} = this.state;
    const {classes} = this.props;
    return (
      <div>

        <Navbar title={'Discussions'} />
        <DiscussionNav />

        <div className={classes.container}>

          {/* <Typography className={classes.title} variant="h4" gutterBottom>
            {discussion && discussion.title}
          </Typography> */}

          <Divider />

          <ChatInput emitMessageToServer={this.emitMessageToServer} />
          <div id="chat-list" className={classes.chatList}>
            {chats.map (c => {
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
