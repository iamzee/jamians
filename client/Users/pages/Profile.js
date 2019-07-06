import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth';
import {readUser} from '../../api/user';
import {getSAS, download} from '../../api/upload';
import ProfileActionButton from '../components/ProfileActionButton';
import Navbar from '../../components/Navbar';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(10),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
      padding: theme.spacing(2),
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
  infoSection: {
    width: '100%',
  },
});

class Profile extends React.Component {
  state = {
    me: null,
    user: null,
    posterLink: null,
  };

  componentDidMount = async () => {
    let {user: me, token} = isAuthenticated();
    const {userId} = this.props.match.params;
    me = await readUser(me._id, token);
    const user = await readUser(userId, token);

    if (user.avatar) {
      const sasToken = await getSAS('avatar');
      const posterLink = download(sasToken, 'avatar', user.avatar);
      this.setState(() => ({posterLink}));
    }

    this.setState(() => ({me, user}));
  };

  render() {
    const {me, user, posterLink} = this.state;
    const {classes} = this.props;
    if (me && user) {
      return (
        <div>
          <Navbar title="Profile" />

          <div className={classes.root}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {posterLink ? (
                      <Avatar className={classes.avatar} src={posterLink} />
                    ) : (
                      <Avatar className={classes.avatar}>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </Grid>
                  <Grid item xs={!2} sm={6} className={classes.infoSection}>
                    <Typography variant="h5">{user.name}</Typography>
                    <ProfileActionButton me={me} user={user} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

export default withStyles(styles)(Profile);
