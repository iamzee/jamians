import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    cssLabel: {
      '&$cssFocused': {
        color: theme.home.primary,
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: theme.home.primary,
      },
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2,
      backgroundColor: theme.home.secondary,

      '&:hover': {
        backgroundColor: theme.home.primary,
      },
    },
    error: {
      color: red[500],
      fontWeight: 'bold',
    },
    progress: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      color: theme.home.primary,
    },
  };
};

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
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
    this.setState (() => ({loading: true}));

    if (!this.state.email || !this.state.password) {
      this.setState (() => ({
        error: 'All fields are necessary!',
        loading: false,
      }));
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      login (user).then (data => {
        if (data.errorMessage) {
          this.setState (() => ({error: data.errorMessage, loading: false}));
        } else {
          authenticate (data, () => {
            this.setState (() => ({loading: false, error: ''}));
            this.props.history.push ('/');
          });
        }
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
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  underline: classes.cssUnderline,
                },
              }}
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <br />
            <TextField
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  underline: classes.cssUnderline,
                },
              }}
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <br />
            {this.state.error &&
              <Typography variant="subtitle1" className={classes.error}>
                {this.state.error}
              </Typography>}
          </CardContent>
          <CardActions>

            {this.state.loading
              ? <Button variant="contained" className={classes.submit}>
                  Loging in
                  <CircularProgress
                    className={classes.progress}
                    size={24}
                    variant="indeterminate"
                  />
                </Button>
              : <Button
                  variant="contained"
                  className={classes.submit}
                  onClick={this.onSubmit}
                >
                  Login
                </Button>}

          </CardActions>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (LoginPage);
