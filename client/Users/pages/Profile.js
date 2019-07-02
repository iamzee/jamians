import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth';
import {readUser, sendFriendRequest} from '../../api/user';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  card: {
    textAlign: 'center',
  },
  avatar: {
    margin: 'auto',
    width: 150,
    height: 150,
  },
});

class Profile extends React.Component {
  state = {
    user: null,
    sending: false,
    sent: false,
  };

  componentDidMount = async () => {
    const {token} = isAuthenticated();
    const {userId} = this.props.match.params;
    const user = await readUser(userId, token);
    this.setState(() => ({user}));
  };

  onSendFriendRequest = async () => {
    this.setState(() => ({sending: true}));
    const {token} = isAuthenticated();
    await sendFriendRequest(this.state.user._id, token);

    this.setState(() => ({sending: false, sent: true}));
  };

  isFriend = () => {
    const {user: loggedInUser} = isAuthenticated();
    console.log('LOG', loggedInUser._id);
    console.log('FrI', this.state.user._id);
    const isFriend = this.state.user.friends.find(
      friend => friend.toString() === loggedInUser._id.toString()
    );

    if (isFriend) {
      return true;
    }

    return false;
  };

  isFriendRequestSent = () => {
    const {user: loggedInUser} = isAuthenticated();
    const isFriendRequestSent = loggedInUser.friendRequestsSent.find(
      friend => friend.toString() === this.state.user._id.toString()
    );

    if (isFriendRequestSent) {
      return true;
    }

    return false;
  };

  isFriendRequest = () => {
    const {user} = this.state;
    const {user: loggedInUser} = isAuthenticated();

    const isFriendRequest = loggedInUser.friendRequestsReceived.find(
      friend => friend.toString() === user._id.toString()
    );

    if (isFriendRequest) {
      return true;
    }

    return false;
  };

  render() {
    const {classes} = this.props;
    const {user} = this.state;
    const {user: loggedInUser} = isAuthenticated();
    return (
      <div className={classes.root}>
        {user && (
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {user.avatar ? (
                      <Avatar className={classes.avatar} src={user.avatar} />
                    ) : (
                      <Avatar className={classes.avatar}>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{user.name}</Typography>
                    {loggedInUser._id.toString() === user._id.toString() ? (
                      <Button variant="outlined" color="secondary">
                        Edit Profile
                      </Button>
                    ) : (
                      <React.Fragment>
                        {this.isFriend() ? (
                          <Button variant="outlined" color="secondary">
                            Remove Friend
                          </Button>
                        ) : (
                          <React.Fragment>
                            {this.isFriendRequestSent() ? (
                              <Button variant="outlined" color="secondary">
                                Friend Request Sent
                              </Button>
                            ) : (
                              <React.Fragment>
                                {this.isFriendRequest() ? (
                                  <Button variant="outlined" color="secondary">
                                    Accept Friend Request
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={this.onSendFriendRequest}
                                  >
                                    Send Friend Request
                                  </Button>
                                )}
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
