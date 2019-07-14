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
import Avatar from '@material-ui/core/Avatar';
import {MenuItem} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments} from '../../api/department';
import {listCourses} from '../../api/course';
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
    textAlign: 'center',
  },
  title: {
    fontWeight: 300,
  },
  textField: {
    width: 300,
  },
  avatar: {
    margin: 'auto',
    width: 150,
    height: 150,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fileInput: {
    display: 'none',
  },
});

class UserForm extends React.Component {
  state = {
    file: null,
    name: this.props.me ? this.props.me.name : '',
    email: this.props.me ? this.props.me.email : '',
    password: '',
    error: '',
    departments: [],
    department: this.props.me ? this.props.me.department : '',
    courses: [],
    course: this.props.me ? this.props.me.course : '',
    isStudent: false,
    showDepartmentLoader: false,
    showDepartments: false,
    showCourseLoader: false,
    showCourses: false,
    signing: false,
    done: false,
  };

  componentDidMount = async () => {
    if (this.props.me.department) {
      this.setState(() => ({
        isStudent: true,
        showDepartmentLoader: true,
        showDepartments: false,
      }));

      const departments = await listDepartments();
      this.setState(() => ({
        showDepartmentLoader: false,
        departments,
        showDepartments: true,
        showCourseLoader: true,
      }));
      const courses = await listCourses(this.props.me.department);
      this.setState(() => ({
        showCourseLoader: false,
        showCourses: true,
        courses,
      }));
    }
  };

  onFileChange = e => {
    const file = e.target.files[0];
    this.setState(() => ({file, posterLink: ''}));
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
    if (!this.state.name || !this.state.email) {
      this.setState(() => ({error: 'Name and Email are required.'}));
    } else if (!this.props.me && !this.state.password) {
      this.setState(() => ({error: 'Password is required'}));
    } else {
      if (!validator.isEmail(this.state.email)) {
        this.setState(() => ({error: 'Enter a valid email'}));
      } else if (this.state.password.length < 6 && !this.props.me) {
        this.setState(() => ({
          error: 'Password should be minimum of 6 characters.',
        }));
      } else if (this.state.department && !this.state.course) {
        this.setState(() => ({
          error: 'Department and course both are required for a student.',
        }));
      } else {
        this.setState(() => ({signing: true}));

        const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          department: this.state.department ? this.state.department : null,
          course: this.state.course ? this.state.course : null,
          avatar: this.state.file,
        };

        this.props.onSubmit(user, () => {
          this.setState(() => ({signing: false, done: true}));
        });
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
            {this.props.me ? 'Update Profile' : 'New Account'}
          </Typography>
          <Divider variant="middle" />

          {/* ---------------------------- AVATAR ----------------------------------------- */}

          {this.props.me.avatar && !this.state.file ? (
            <React.Fragment>
              <Avatar
                className={classes.avatar}
                src={`http://${window.location.host}/api/users/${
                  this.props.me._id
                }/avatar`}
              />
              <input
                className={classes.fileInput}
                type="file"
                onChange={this.onFileChange}
                id="avatar"
              />
              <label htmlFor="avatar">
                <Button color="secondary" component="span">
                  Change
                </Button>
              </label>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.state.file ? (
                <React.Fragment>
                  <Avatar
                    className={classes.avatar}
                    src={URL.createObjectURL(this.state.file)}
                  />
                  <input
                    className={classes.fileInput}
                    type="file"
                    onChange={this.onFileChange}
                    id="avatar"
                  />
                  <label htmlFor="avatar">
                    <Button color="secondary" component="span">
                      Change
                    </Button>
                  </label>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  <input
                    className={classes.fileInput}
                    type="file"
                    onChange={this.onFileChange}
                    id="avatar"
                  />
                  <label htmlFor="avatar">
                    <Button color="secondary" component="span">
                      Add Profile Photo
                    </Button>
                  </label>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          <br />

          {/* ---------------------- NAME EMAIL PASSWORD ------------------------------- */}

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
          {!this.props.me && (
            <TextField
              label="Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
          )}
          <br />

          {/* ------------------------------- CHECKBOX  ---------------------------------------*/}

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

          {/* ----------------------- DEPARTMENT COURSE ------------------------------- */}

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
              {this.props.me ? 'Saving' : 'Creating Account'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSubmit}
            >
              {this.props.me ? 'Save' : 'Create Account'}
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
        {this.state.done && (
          <SnackbarComponent
            variant="success"
            message={'Profile updated. Refresh.'}
            open={true}
            onClose={this.onSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(UserForm);
