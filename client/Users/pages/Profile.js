import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth';
import {readUser} from '../../api/user';
import {Link} from '@material-ui/core';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('xs')]: {
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
  link: {
    textDecoration: 'none',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing (2),
    padding: theme.spacing (2),
  },
  itemList: {
    display: 'flex',
  },
  item: {
    marginRight: theme.spacing (2),
    textAlign: 'center',
  },
});

class Profile extends React.Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    const {token} = isAuthenticated ();
    const {userId} = this.props.match.params;
    const user = await readUser (userId, token);
    this.setState (() => ({user}));
  };

  render () {
    const {classes} = this.props;
    const {user} = this.state;
    return (
      <div className={classes.root}>
        {this.state.user &&
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    {user.avatar
                      ? <Avatar className={classes.avatar} src={user.avatar} />
                      : <Avatar className={classes.avatar}>
                          <PersonIcon />
                        </Avatar>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>{user.name}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h5" color="secondary">
                About
              </Typography>
              <div className={classes.itemList}>
                <div className={classes.item}>
                  <Link to={`/users/${user._id}/follower`}>
                    <Typography>23</Typography>
                    <Typography>Followers</Typography>
                  </Link>
                </div>
                <div className={classes.item}>
                  <Typography>12</Typography>
                  <Typography>Following</Typography>
                </div>
              </div>
              <Divider />
            </Paper>
          </div>}
      </div>
    );
  }
}

export default withStyles (styles) (Profile);
