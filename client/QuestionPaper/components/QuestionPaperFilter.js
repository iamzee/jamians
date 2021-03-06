import React from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments} from '../../api/department';
import {listCourses} from '../../api/course';
import {listSubjects} from '../../api/subject';
import {semesters} from '../../helpers/notes';

const styles = theme => ({
  dialog: {
    maxWidth: 600,
    margin: 'auto',
  },
  textField: {
    minWidth: 300,
    margin: 'auto',
    marginBottom: theme.spacing (2),
  },
  progress: {
    marginLeft: theme.spacing (2),
    marginRight: theme.spacing (2),
  },
});

class QuestionPaperFilter extends React.Component {
  state = {
    open: false,
    departments: [],
    department: '',
    courses: [],
    subjects: [],
    course: '',
    semester: '',
    subject: '',
    showCourseLoader: false,
    showCourses: false,
    showSubjects: false,
  };

  componentDidMount = async () => {
    const departments = await listDepartments ();
    this.setState (() => ({
      departments,
    }));
  };

  onDepartmentChange = async e => {
    const department = e.target.value;

    this.setState (() => ({
      department,
      course: '',
      showCourseLoader: true,
      showCourses: false,
      showSubjects: false,
    }));

    const courses = await listCourses (department);
    this.setState (() => ({
      courses,
      showCourseLoader: false,
      showCourses: true,
    }));
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState (() => ({course, subject: ''}));
  };

  onSemesterChange = async e => {
    const semester = e.target.value;
    this.setState (() => ({showSubjectLoader: true, semester}));

    const subjects = await listSubjects (this.state.course, semester);
    this.setState (() => ({
      showSubjects: true,
      showSubjectLoader: false,
      subjects,
    }));
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  handleClickOpen = () => {
    this.setState (() => ({open: true}));
  };

  handleClose = () => {
    this.setState (() => ({open: false}));
  };

  submit = () => {
    const {department, course, semester, subject} = this.state;
    this.props.history.push (
      `/question_papers?department=${department}&course=${course}&semester=${semester}&subject=${subject}`
    );
    this.setState (() => ({open: false}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="contained"
          color="secondary"
        >
          Filter
        </Button>

        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Filter Notes</DialogTitle>
          <DialogContent>
            <TextField
              className={classes.textField}
              select
              value={this.state.department}
              onChange={this.onDepartmentChange}
              margin="normal"
              label="Department"
              variant="outlined"
            >
              {this.state.departments.map (d => (
                <MenuItem key={d._id} value={d._id}>
                  {d.name}
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
                  value={this.state.course}
                  onChange={this.onCourseChange}
                  margin="normal"
                  label="Course"
                  variant="outlined"
                >
                  {this.state.courses.map (course => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <TextField
                  className={classes.textField}
                  select
                  value={this.state.semester}
                  onChange={this.onSemesterChange}
                  margin="normal"
                  label="Semester"
                  variant="outlined"
                >
                  {semesters.map (semester => (
                    <MenuItem key={semester.value} value={semester.value}>
                      {semester.label}
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
                    value={this.state.subject}
                    onChange={this.onSubjectChange}
                    margin="normal"
                    label="Subject"
                    variant="outlined"
                  >
                    {this.state.subjects.map (subject => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </TextField>}
              </div>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.submit}>Apply</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles (styles) (QuestionPaperFilter);
