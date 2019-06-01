import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import validator from 'validator';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments, readDepartment} from '../../api/department.api';
import {signup} from '../../api/auth.api';
import Navbar from '../../components/Navbar';

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
    progress: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      color: theme.home.primary,
    },
    cssLabel: {
      '&$cssFocused': {
        color: theme.home.primary,
      },
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: theme.home.primary,
      },
    },
    notchedOutline: {},
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
    courses: [],
    course: '',
    loading: false,
    showCourseLoader: false,
    showCourses: false,
  };

  componentDidMount() {
    listDepartments().then(departments => {
      this.setState(() => ({departments}));
    });
  }

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({name}));
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({email}));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({password}));
  };

  onDepartmentChange = e => {
    this.setState(() => ({
      department: e.value,
      showCourseLoader: true,
      showCourses: false,
    }));
    readDepartment(e.value).then(({courses}) => {
      this.setState(() => ({
        courses,
        showCourseLoader: false,
        showCourses: true,
      }));
    });
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState(() => ({course}));
  };

  onSubmit = e => {
    this.setState(() => ({loading: true}));

    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.department ||
      !this.state.course
    ) {
      this.setState(() => ({
        error: 'All fields are necessary!',
        loading: false,
      }));
    } else if (!validator.isEmail(this.state.email)) {
      this.setState(() => ({
        error: 'Enter a valid email address!',
        loading: false,
      }));
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        department: this.state.department,
        course: this.state.course,
      };

      signup(user).then(data => {
        if (data.errorMessage) {
          this.setState(() => ({error: data.errorMessage, loading: false}));
        } else {
          this.setState(() => ({loading: false}));
          this.props.history.push('/login?new=true');
        }
      });
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Navbar title={'Jamians'} />
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
              className={classes.select}
              placeholder="Department"
              options={this.state.departments.map(department => {
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
            />
            <br />

            {this.state.showCourseLoader && (
              <CircularProgress
                className={classes.progress}
                size={24}
                variant="indeterminate"
              />
            )}

            {this.state.showCourses && (
              <TextField
                className={classes.textField}
                select
                label="Course"
                margin="normal"
                variant="outlined"
                value={this.state.course}
                onChange={this.onCourseChange}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              >
                {this.state.courses.map(course => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {this.state.error && (
              <Typography variant="subtitle1" className={classes.error}>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {this.state.loading ? (
              <Button variant="contained" className={classes.submit}>
                Signing up
                <CircularProgress
                  className={classes.progress}
                  size={24}
                  variant="indeterminate"
                />
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.submit}
                onClick={this.onSubmit}
              >
                Signup
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupPage);
