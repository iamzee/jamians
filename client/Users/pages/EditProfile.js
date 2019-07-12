import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {readUser, updateUser} from '../../api/user';
import {isAuthenticated} from '../../helpers/auth';
import Navbar from '../../components/Navbar';

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
  textField: {
    width: '100%',
  },
  avatar: {
    margin: 'auto',
    width: 150,
    height: 150,
    marginBottom: theme.spacing(2),
  },
  fileInput: {
    display: 'none',
  },
  submit: {
    marginTop: theme.spacing(2),
  },
});

class EditProfile extends React.Component {
  state = {
    user: null,
    name: null,
    department: null,
    course: null,
    file: null,
    isStudent: false,
    error: '',
    updating: false,
    updated: false,
  };

  componentDidMount = async () => {
    const {userId} = this.props.match.params;
    const {token} = isAuthenticated();

    const user = await readUser(userId, token);

    if (user.avatar) {
      const sasToken = await getSAS('avatar');
      const posterLink = download(sasToken, 'avatar', user.avatar);
      this.setState(() => ({posterLink}));
    }

    this.setState(() => ({
      user,
      name: user.name,
      department: user.department,
      course: user.course,
    }));
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({name}));
  };

  onFileChange = e => {
    const file = e.target.files[0];
    this.setState(() => ({file, posterLink: ''}));
  };

  onCheckboxChange = e => {};

  onSubmit = async () => {
    if (!this.state.name) {
      this.setState(() => ({error: 'Name field is required.'}));
    } else {
      this.setState(() => ({updating: true}));

      const updatedUser = {
        name: this.state.name,
        avatar: this.state.file,
      };

      await updateUser(this.props.params.userId, updatedUser);

      this.setState(() => ({updating: false, updated: true}));
    }
  };

  render() {
    const {classes} = this.props;
    const {name, posterLink} = this.state;
    return (
      <div>
        <Navbar title="Profile" />

        {this.state.user && (
          <div className={classes.root}>
            {posterLink ? (
              <React.Fragment>
                <Avatar className={classes.avatar} src={posterLink} />
                {/* <Button color="secondary">Remove</Button> */}
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
                        Upload
                      </Button>
                    </label>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            <TextField
              variant="outlined"
              className={classes.textField}
              label="Name"
              value={name}
              onChange={this.onNameChange}
              margin="normal"
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

            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSubmit}
              component="span"
              className={classes.submit}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EditProfile);
