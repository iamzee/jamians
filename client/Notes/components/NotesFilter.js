import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments} from '../../api/department.api';
import {isAuthenticated} from '../../helpers/auth.helper';

const styles = theme => ({
  dialog: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  textField: {
    width: '90%',
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
});

class NotesFilter extends React.Component {
  state = {
    departments: [],
    department: '',
    courses: [],
    subjects: [],
    subject: '',
    course: '',
    open: false,
  };

  componentDidMount () {
    listDepartments ().then (departments => {
      this.setState (() => ({departments}));
    });

    const {user} = isAuthenticated ();
    this.setState (() => ({
      department: user.department._id,
      courses: user.department.courses,
      course: user.course._id,
      subjects: user.course.subjects,
    }));
  }

  onOpen = () => {
    this.setState (() => ({open: true}));
  };

  onClose = () => {
    this.setState (() => ({open: false}));
  };

  onDepartmentChange = e => {
    const department = e.target.value;
    this.setState (() => ({department}));
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState (() => ({course}));
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onApplyFilter = () => {
    if (this.state.subject) {
      this.props.history.push (
        `/notes?departmentId=${this.state.department}&courseId=${this.state.course}&subjectId=${this.state.subject}`
      );
    } else {
      this.props.history.push (
        `/notes?departmentId=${this.state.department}&courseId=${this.state.course}`
      );
    }
    this.setState (() => ({open: false}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Button onClick={this.onOpen}>Filter Notes</Button>
        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onClose={this.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Filter Notes</DialogTitle>
          <DialogContent>
            <TextField
              className={classes.textField}
              select
              label="Department"
              margin="normal"
              value={this.state.department}
              onChange={this.onDepartmentChange}
            >
              {this.state.departments.map (department => (
                <MenuItem key={department._id} value={department._id}>
                  {department.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.textField}
              select
              label="Course"
              margin="normal"
              value={this.state.course}
              onChange={this.onCourseChange}
            >
              {this.state.courses.map (course => (
                <MenuItem key={course._id} value={course._id}>
                  {course.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.textField}
              select
              label="Subject"
              margin="normal"
              value={this.state.subject}
              onChange={this.onSubjectChange}
            >
              {this.state.subjects.map (subject => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button onClick={this.onApplyFilter}>Apply Filter</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles (styles) (NotesFilter);
