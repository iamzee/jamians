import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {authenticate} from '../../helpers/auth.helper';
import {login} from '../../api/auth.api';
import Navbar from '../components/Navbar';

const styles = theme => {
  return {
    card: {
      maxWidth: 400,
      margin: 'auto',
      textAlign: 'center',
    },
    title: {
      color: theme.home.primary,
      paddingBottom: theme.spacing.unit * 2,
    },
    textField: {
      width: 300,
      marginBottom: theme.spacing.unit * 2,
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2,
      backgroundColor: theme.home.secondary,

      '&:hover': {
        backgroundColor: theme.home.primary,
      },
    },
  };
};

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState (() => ({email}));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState (() => ({password}));
  };

  onSubmit = e => {
    if (!this.state.email || !this.state.password) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      login (user).then (jwt => {
        console.log ('login', jwt);
        authenticate (jwt, () => {
          this.props.history.push ('/');
        });
      });
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar />
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h5">
              Login
            </Typography>
            <TextField
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <br />
            <TextField
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <br />
            {this.state.error && <Typography>{this.state.error}</Typography>}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect () (withStyles (styles) (LoginPage));