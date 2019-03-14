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

import {startLogin} from '../actions/auth.action';
import {authenticate} from '../helpers/auth.helper';
import {login} from '../api/auth.api';

const styles = theme => {
  // console.log (theme.palette.primary.main);
  return {
    card: {
      maxWidth: 400,
      margin: 'auto',
      textAlign: 'center',
    },
    title: {
      color: theme.palette.secondary.main,
    },
    textField: {
      width: 300,
    },
    submit: {
      margin: 'auto',
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
      // this.props.dispatch (startLogin (user)).then (() => {
      //   this.props.history.push ('/');
      // });
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
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h5">Login</Typography>
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
            color="primary"
            className={classes.submit}
            onClick={this.onSubmit}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect () (withStyles (styles) (LoginPage));
