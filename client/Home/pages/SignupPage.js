import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import Redirect from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments} from '../../api/department.api';
import {authenticate} from '../../helpers/auth.helper';
import {signup} from '../../api/auth.api';
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
    select: {
      width: 300,
      margin: 'auto',
      marginTop: theme.spacing.unit * 2,
      fontFamily: 'Roboto',
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
      fontWeight: 'bold',
      color: red[500],
    },
  };
};

class SignupPage extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    departments: [],
    department: '',
  };

  componentDidMount () {
    listDepartments ().then (departments => {
      this.setState (() => ({departments}));
    });
  }

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

  onDepartmentChange = e => {
    this.setState (() => ({department: e.value}));
  };

  onSubmit = e => {
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.department
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        department: this.state.department,
      };

      signup (user).then (data => {
        if (data.errorMessage) {
          this.setState (() => ({error: data.errorMessage}));
        } else {
          authenticate (data, () => {
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
              Signup
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
              label="Name"
              id="name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.onNameChange}
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
            <Select
              isClearable
              className={classes.select}
              placeholder="Select Department"
              options={this.state.departments.map (department => {
                return {
                  value: department._id,
                  label: department.name,
                };
              })}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#d7fbe8',
                  primary: '#1fab89',
                },
              })}
              onChange={this.onDepartmentChange}
            /><br />
            {this.state.error &&
              <Typography variant="subtitle1" className={classes.error}>
                {this.state.error}
              </Typography>}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Signup
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (SignupPage);
