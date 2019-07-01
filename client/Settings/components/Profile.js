import React from 'react';
import {Link} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import {isAuthenticated} from '../../helpers/auth';

const styles = theme => ({
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
  },
  // fileUpload: {
  //   display: 'none',
  // },
});

class Profile extends React.Component {
  // state = {
  //   file: null,
  // };

  // onFileChange = e => {
  //   const file = e.target.files[0];
  //   this.setState (() => ({file, fileChange: true}));
  // };

  render () {
    const {classes} = this.props;
    const {user} = isAuthenticated ();
    return (
      <Card className={classes.card}>
        <CardContent>
          {/* {this.state.file
                ? <Avatar
                    className={classes.avatar}
                    src={URL.createObjectURL (this.state.file)}
                  />
                : <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>}
              <input
                className={classes.fileUpload}
                onChange={this.onFileChange}
                type="file"
                id="avatar"
              />
              <label htmlFor="avatar">
                <IconButton component="span">
                  <UploadIcon />
                </IconButton>
              </label> */}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              {user.avatar
                ? <Avatar className={classes.avatar} src={user.avatar} />
                : <Avatar className={classes.avatar}><PersonIcon /></Avatar>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{user.name}</Typography>
              <Link to="/settings/editProfile" className={classes.link}>
                <Button color="secondary">Edit Profile</Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles (styles) (Profile);
