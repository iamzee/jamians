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

import {startSignup} from '../actions/user.action';

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

class SignupPage extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState (() => ({name}));
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
    if (!this.state.name || !this.state.email || !this.state.password) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      this.props.dispatch (startSignup (user));
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h5">Login</Typography>
          <TextField
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <br />
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

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect () (withStyles (styles) (SignupPage));
