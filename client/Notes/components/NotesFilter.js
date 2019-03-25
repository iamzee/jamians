import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments} from '../../api/department.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import {readDepartment} from '../../api/department.api';
import {readCourse} from '../../api/course.api';

const styles = theme => ({
  dialog: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  textField: {
    width: 200,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  progress: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    color: theme.notes.primary,
  },
  filterButton: {
    backgroundColor: theme.notes.tertiary,

    '&:hover': {
      backgroundColor: theme.notes.primary,
      color: '#fff',
    },
  },
  dialogButton: {
    color: theme.notes.tertiary,

    '&:hover': {
      backgroundColor: theme.notes.primary,
      color: '#fff',
    },
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
    showCourseLoader: false,
    showCourses: true,
    showSubjectLoader: false,
    showSubjects: true,
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
    this.setState (() => ({
      department,
      showCourseLoader: true,
      showCourses: false,
      showSubjects: false,
    }));

    readDepartment (department).then (({courses}) => {
      this.setState (() => ({
        courses,
        showCourseLoader: false,
        showCourses: true,
        course: '',
        subject: '',
      }));
    });
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState (() => ({
      course,
      showSubjectLoader: true,
      showSubjects: false,
    }));

    readCourse (course).then (({subjects}) => {
      this.setState (() => ({
        subjects,
        showSubjectLoader: false,
        showSubjects: true,
        subject: '',
      }));
    });
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onApplyFilter = () => {
    if (this.state.subject && this.state.course) {
      this.props.history.push (
        `/notes?departmentId=${this.state.department}&courseId=${this.state.course}&subjectId=${this.state.subject}`
      );
    } else if (this.state.course) {
      this.props.history.push (
        `/notes?departmentId=${this.state.department}&courseId=${this.state.course}`
      );
    } else {
      this.props.history.push (`/notes?departmentId=${this.state.department}`);
    }
    this.setState (() => ({open: false}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Button
          variant="contained"
          className={classes.filterButton}
          onClick={this.onOpen}
        >
          Filter Notes
        </Button>
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

            <br />

            {this.state.showCourseLoader &&
              <CircularProgress
                className={classes.progress}
                size={24}
                variant="indeterminate"
              />}

            {this.state.showCourses &&
              <div>
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

                <br />

                {this.state.showSubjectLoader &&
                  <CircularProgress
                    className={classes.progress}
                    size={24}
                    variant="indeterminate"
                  />}

                {this.state.showSubjects &&
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
                  </TextField>}

                <br />

              </div>}

          </DialogContent>
          <DialogActions>
            <Button className={classes.dialogButton} onClick={this.onClose}>
              Cancel
            </Button>
            <Button
              className={classes.dialogButton}
              onClick={this.onApplyFilter}
            >
              Apply Filter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles (styles) (NotesFilter);
