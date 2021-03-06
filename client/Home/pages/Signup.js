import React from 'react';
import validator from 'validator';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {create} from '../../api/user';
import {listDepartments} from '../../api/department';
import {listCourses} from '../../api/course';
import {MenuItem} from '@material-ui/core';
import SnackbarComponent from '../../components/SnackbarComponent';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(10),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 300,
  },
  textField: {
    width: 300,
  },
});

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    departments: [],
    department: '',
    courses: [],
    course: '',
    isStudent: false,
    showDepartmentLoader: false,
    showDepartments: false,
    showCourseLoader: false,
    showCourses: false,
    signing: false,
    done: false,
  };

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

  onCheckboxChange = async e => {
    const isStudent = e.target.checked;
    this.setState(() => ({isStudent}));

    if (isStudent) {
      this.setState(() => ({showDepartmentLoader: true}));
      const departments = await listDepartments();
      this.setState(() => ({
        departments,
        showDepartmentLoader: false,
        showDepartments: true,
      }));
    } else {
      this.setState(() => ({
        showDepartments: false,
        showCourses: false,
        department: '',
        course: '',
      }));
    }
  };

  onDepartmentChange = async e => {
    const department = e.target.value;
    this.setState(() => ({
      department,
      showCourseLoader: true,
      showCourses: false,
    }));

    const courses = await listCourses(department);
    this.setState(() => ({
      courses,
      showCourseLoader: false,
      showCourses: true,
    }));
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState(() => ({course}));
  };

  onSubmit = async () => {
    if (!this.state.name || !this.state.email || !this.state.password) {
      this.setState(() => ({error: 'All fields are necessary.'}));
    } else {
      if (!validator.isEmail(this.state.email)) {
        this.setState(() => ({error: 'Enter a valid email'}));
      } else if (this.state.password.length < 6) {
        this.setState(() => ({
          error: 'Password should be minimum of 6 characters.',
        }));
      } else if (this.state.department && !this.state.course) {
        this.setState(() => ({
          error: 'Department and course both are required for a student.',
        }));
      } else {
        this.setState(() => ({signing: true}));

        let user = {};

        if (this.state.department && this.state.course) {
          user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            department: this.state.department,
            course: this.state.course,
          };
        } else {
          user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          };
        }

        await create(user);
        this.setState(() => ({signing: false}));
        this.props.history.push('/login?new=true');
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
            New Account
          </Typography>
          <Divider />

          <TextField
            label="Name"
            value={this.state.name}
            onChange={this.onNameChange}
            margin="normal"
            variant="outlined"
            className={classes.textField}
          />
          <br />
          <TextField
            label="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
            margin="normal"
            variant="outlined"
            className={classes.textField}
          />
          <br />
          <TextField
            label="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            margin="normal"
            variant="outlined"
            className={classes.textField}
          />
          <br />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isStudent}
                value=""
                onChange={this.onCheckboxChange}
              />
            }
            label="Are u a student?"
          />
          <br />

          {this.state.showDepartmentLoader && (
            <CircularProgress
              className={classes.progress}
              size={24}
              variant="indeterminate"
            />
          )}

          {this.state.showDepartments && (
            <TextField
              label="Department"
              value={this.state.department}
              onChange={this.onDepartmentChange}
              select
              variant="outlined"
              margin="normal"
              className={classes.textField}
            >
              {this.state.departments.map(d => (
                <MenuItem key={d._id} value={d._id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
          )}

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
              label="Course"
              value={this.state.course}
              onChange={this.onCourseChange}
              select
              variant="outlined"
              margin="normal"
              className={classes.textField}
            >
              {this.state.courses.map(c => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <br />

          {this.state.signing ? (
            <Button variant="contained" color="secondary">
              <CircularProgress size={24} color="inherit" />
              Creating Account
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSubmit}
            >
              Create Account
            </Button>
          )}
          <br />
        </div>
        {this.state.error && (
          <SnackbarComponent
            variant="error"
            message={this.state.error}
            open={true}
            onClose={this.onSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
