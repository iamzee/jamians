import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {login} from '../../api/auth';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
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
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      const error = await login(user);
      if (error) {
        this.setState(() => ({error}));
      }
    }
  };

  render() {
    return (
      <div>
        <TextField
          margin="normal"
          variant="outlined"
          label="Email"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <br />
        <TextField
          margin="normal"
          variant="outlined"
          label="Password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <Button onClick={this.onSubmit}>Login</Button>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default Login;
