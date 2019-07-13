import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {listDepartments} from '../../api/department';
import {listCourses} from '../../api/course';
import {listSubjects} from '../../api/subject';
import {createNote} from '../../api/notes';
import {semesters} from '../../helpers/notes';
import {isAuthenticated} from '../../helpers/auth';

import Navbar from '../../components/Navbar';
import NotesNav from '../components/NotesNav';
import SnackbarComponent from '../../components/SnackbarComponent';

import styles from '../styles/UploadNotesPageStyles';

class UploadNotesPage extends React.Component {
  state = {
    file: null,
    subjects: [],
    filteredSubjects: [],
    subject: '',
    departments: [],
    department: '',
    courses: [],
    course: '',
    topic: '',
    description: '',
    semester: '',
    error: '',
    progressPercent: 0,
    uploading: false,
    uploaded: false,
    showCourseLoader: false,
    showSubjectLoader: false,
    showSemesterLoader: false,
    showCourses: false,
    showSubjects: false,
    showSemesters: false,
  };

  componentDidMount = async () => {
    const departments = await listDepartments ();
    this.setState (() => ({departments}));

    const {user} = isAuthenticated ();

    if (user.department) {
      const courses = await listCourses (user.department);

      this.setState (() => ({
        department: user.department,
        courses,
        course: user.course,
        showCourses: true,
        showSemesters: true,
      }));
    }
  };

  onFileChange = e => {
    const file = e.target.files[0];
    this.setState (() => ({file}));
  };

  onTopicChange = e => {
    const topic = e.target.value;
    this.setState (() => ({topic}));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState (() => ({description}));
  };

  onDepartmentChange = async e => {
    const department = e.target.value;

    this.setState (() => ({
      department,
      course: '',
      showCourseLoader: true,
      showCourses: false,
      showSubjects: false,
      showSemesters: false,
    }));

    const courses = await listCourses (department);
    this.setState (() => ({
      courses,
      showCourseLoader: false,
      showCourses: true,
    }));
  };

  onCourseChange = e => {
    this.setState (() => ({showSemesterLoader: true, showSemesters: false}));
    const course = e.target.value;
    this.setState (() => ({
      course,
      subject: '',
      showSemesterLoader: false,
      showSemesters: true,
    }));
  };

  onSemesterChange = async e => {
    const semester = e.target.value;
    this.setState (() => ({
      showSubjectLoader: true,
      showSubjects: false,
      semester,
    }));

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

  onSnackbarClose = () => {
    this.setState (() => ({error: ''}));
  };

  onSubmit = async e => {
    if (
      !this.state.file ||
      !this.state.topic ||
      !this.state.subject ||
      !this.state.semester ||
      !this.state.course ||
      !this.state.department
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else if (this.state.file.type !== 'application/pdf') {
      this.setState (() => ({error: 'Upload only pdf file.'}));
    } else {
      this.setState (() => ({uploading: true, error: ''}));

      const note = {
        name: this.state.file,
        topic: this.state.topic,
        description: this.state.description,
        department: this.state.department,
        course: this.state.course,
        semester: this.state.semester,
        subject: this.state.subject,
      };

      await createNote (note);
      this.setState (() => ({uploading: false, uploaded: true}));
    }
  };

  handleClose = () => {
    this.setState (() => ({open: false}));
  };

  render () {
    const {classes} = this.props;

    return (
      <div>
        <Navbar title={'Notes'} />

        <NotesNav />

        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h4">
              Upload Notes
            </Typography>
            <input
              accept="application/pdf"
              className={classes.fileInput}
              type="file"
              id="file-upload"
              onChange={this.onFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                className={classes.chooseFileButton}
                variant="outlined"
                color="secondary"
                component="span"
              >
                Choose File
              </Button>
            </label>
            {this.state.file &&
              <Typography variant="subtitle2">
                {this.state.file.name}
              </Typography>}
            <br />
            <TextField
              className={classes.textField}
              label="Topic"
              value={this.state.topic}
              onChange={this.onTopicChange}
              variant="outlined"
            />
            <br />
            <TextField
              className={classes.textField}
              label="Description (optional)"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              variant="outlined"
              multiline
              rows="2"
            />
            <br />

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
                size={20}
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

                {this.state.showSemesterLoader &&
                  <CircularProgress
                    className={classes.progress}
                    size={20}
                    variant="indeterminate"
                  />}

                {this.state.showSemesters &&
                  <React.Fragment>
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
                        size={20}
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
                    <br />
                  </React.Fragment>}

              </div>}
          </CardContent>
          <CardActions>
            {this.state.uploading
              ? <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                >
                  Uploading
                  <CircularProgress
                    className={classes.progress}
                    color="inherit"
                    size={20}
                    variant="indeterminate"
                  />
                </Button>
              : <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.onSubmit}
                  color="secondary"
                >
                  Submit
                </Button>}
          </CardActions>
        </Card>

        {this.state.uploaded &&
          <SnackbarComponent
            variant="success"
            message="Notes uploaded!"
            onClose={this.onSnackbarClose}
          />}
        {this.state.error &&
          <SnackbarComponent
            variant="error"
            message={this.state.error}
            onClose={this.onSnackbarClose}
          />}
      </div>
    );
  }
}

export default withStyles (styles) (UploadNotesPage);
