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
import ProfileActionButton from '../components/ProfileActionButton';
import Navbar from '../../components/Navbar';
import PageLoader from '../../components/PageLoader';

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
  };

  componentDidMount = async () => {
    let {user: me, token} = isAuthenticated();
    const {userId} = this.props.match.params;
    me = await readUser(me._id, token);
    const user = await readUser(userId, token);

    this.setState(() => ({me, user}));
  };

  render() {
    const {me, user, posterLink} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <Navbar title="Profile" />

        {me && user ? (
          <div className={classes.root}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {user.avatar ? (
                      <Avatar
                        className={classes.avatar}
                        src={`http://${window.location.host}/api/users/${
                          user._id
                        }/avatar`}
                      />
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
        ) : (
          <PageLoader />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
