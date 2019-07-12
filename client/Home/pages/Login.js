import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import SnackbarComponent from '../../components/SnackbarComponent';
import {login} from '../../api/auth';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(10),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    textAlign: 'center',
  },
  title: {
    fontWeight: 300,
  },
  textField: {
    width: 300,
  },
});

class Login extends React.Component {
  state = {
    open: false,
    email: '',
    password: '',
    error: '',
    logging: false,
  };

  componentDidMount = () => {
    if (this.props.location.search === '?new=true') {
      console.log('TRUE');
      this.setState(() => ({open: true}));
    }
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({email}));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({password}));
  };

  onSubmit = async () => {
    if (!this.state.email || !this.state.password) {
      this.setState(() => ({error: 'All fields are necessary.'}));
    } else {
      this.setState(() => ({logging: true}));
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      const error = await login(user);
      if (error) {
        this.setState(() => ({error}));
        this.setState(() => ({logging: false}));
      } else {
        this.setState(() => ({logging: false}));
        this.props.history.push('/');
      }
    }
  };

  onSnackbarClose = () => {
    this.setState(() => ({error: ''}));
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Jamian Rivets
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Login
          </Typography>
          <Divider />

          <TextField
            className={classes.textField}
            margin="normal"
            variant="outlined"
            label="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <br />
          <TextField
            className={classes.textField}
            margin="normal"
            variant="outlined"
            label="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <br />
          {this.state.logging ? (
            <Button variant="contained" color="secondary">
              <CircularProgress size={20} color="inherit" />
              Logging in
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSubmit}
            >
              Login
            </Button>
          )}
        </div>

        {this.state.error && (
          <SnackbarComponent
            variant="error"
            message={this.state.error}
            onClose={this.onSnackbarClose}
          />
        )}
        {this.state.open && (
          <SnackbarComponent
            variant="success"
            message="Account created. Login to your account."
            onClose={() => {}}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Login);
