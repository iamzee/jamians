import React from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {
  sendFriendRequest,
  removeFriendRequest,
  addFriend,
  removeFriend,
} from '../../api/user';
import {isAuthenticated} from '../../helpers/auth';
import SnackbarComponent from '../../components/SnackbarComponent';
import {createNotification} from '../../api/notification';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
});

class ProfileActionButton extends React.Component {
  state = {
    status: '',
    message: '',
  };

  componentDidMount = () => {
    const {me, user} = this.props;

    const isMe = me._id.toString () === user._id.toString ();
    const isFriend = me.friends.find (
      friend => friend.toString () === user._id.toString ()
    );
    const isFriendRequestSent = me.friendRequestsSent.find (
      friend => friend.toString () === user._id.toString ()
    );
    const isFriendRequestReceived = me.friendRequestsReceived.find (
      friend => friend.toString () === user._id.toString ()
    );

    if (isMe) {
      this.setState (() => ({isMe: true, status: 'ME'}));
    } else if (isFriend) {
      this.setState (() => ({isFriend: true, status: 'FRIEND'}));
    } else if (isFriendRequestSent) {
      this.setState (() => ({
        isFriendRequestSent: true,
        status: 'FRIEND_REQUEST_SENT',
      }));
    } else if (isFriendRequestReceived) {
      this.setState (() => ({
        isFriendRequestReceived: true,
        status: 'FRIEND_REQUEST_RECEIVED',
      }));
    }
  };

  onSendFriendRequest = async () => {
    const {user, me} = this.props;
    this.setState (() => ({status: 'SENDING'}));
    const {token} = isAuthenticated ();
    await sendFriendRequest (this.props.user._id, token);
    await createNotification ({
      message: `${me.name} has send you a friend request.`,
      user,
      link: `/users/${me._id}`,
    });
    this.setState (() => ({
      status: 'FRIEND_REQUEST_SENT',
      message: 'Friend request sent.',
    }));
  };

  onRemoveFriendRequest = async () => {
    this.setState (() => ({status: 'SENDING'}));
    const {token} = isAuthenticated ();
    await removeFriendRequest (this.props.user._id, token);
    this.setState (() => ({status: '', message: 'Friend request removed.'}));
  };

  onAcceptFriendRequest = async () => {
    this.setState (() => ({status: 'SENDING'}));
    const {token} = isAuthenticated ();
    await addFriend (this.props.user._id, token);
    this.setState (() => ({
      status: 'FRIEND',
      message: 'Friend request accepted.',
    }));
  };

  onRemoveFriend = async () => {
    this.setState (() => ({status: 'SENDING'}));
    const {token} = isAuthenticated ();
    await removeFriend (this.props.user._id, token);
    this.setState (() => ({status: '', message: 'Friend removed.'}));
  };

  onSnackbarClose = () => {
    this.setState (() => ({message: ''}));
  };

  render () {
    const {status, message} = this.state;
    const {classes} = this.props;
    switch (status) {
      case 'SENDING': {
        return <CircularProgress size={24} />;
      }
      case 'ME': {
        return (
          <React.Fragment>
            <Link
              className={classes.link}
              to={`/users/${this.props.user._id}/edit`}
            >
              <Button color="secondary">Edit Profile</Button>
            </Link>
            {message &&
              <SnackbarComponent
                message={message}
                variant="success"
                message={message}
                onClose={this.onSnackbarClose}
              />}
          </React.Fragment>
        );
      }
      case 'FRIEND': {
        return (
          <React.Fragment>
            <Button color="secondary" onClick={this.onRemoveFriend}>
              Remove Friend
            </Button>
            {message &&
              <SnackbarComponent
                message={message}
                variant="success"
                message={message}
                onClose={this.onSnackbarClose}
              />}
          </React.Fragment>
        );
      }
      case 'FRIEND_REQUEST_SENT': {
        return (
          <React.Fragment>
            <Button color="secondary" onClick={this.onRemoveFriendRequest}>
              Remove Friend Request
            </Button>
            {message &&
              <SnackbarComponent
                message={message}
                variant="success"
                message={message}
                onClose={this.onSnackbarClose}
              />}
          </React.Fragment>
        );
      }
      case 'FRIEND_REQUEST_RECEIVED': {
        return (
          <React.Fragment>
            <Button color="secondary" onClick={this.onAcceptFriendRequest}>
              Accept Friend Request
            </Button>
            {message &&
              <SnackbarComponent
                message={message}
                variant="success"
                message={message}
                onClose={this.onSnackbarClose}
              />}
          </React.Fragment>
        );
      }
      default: {
        return (
          <React.Fragment>
            <Button color="secondary" onClick={this.onSendFriendRequest}>
              Send Friend Request
            </Button>
            {message &&
              <SnackbarComponent
                message={message}
                variant="success"
                message={message}
                onClose={this.onSnackbarClose}
              />}
          </React.Fragment>
        );
      }
    }
  }
}

export default withStyles (styles) (ProfileActionButton);
