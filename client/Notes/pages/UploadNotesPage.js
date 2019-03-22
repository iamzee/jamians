import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, upload} from '../../api/upload.api';
import {listDepartments, readDepartment} from '../../api/department.api';
import {readCourse} from '../../api/course.api';
import {createNote} from '../../api/note.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import {semesters} from '../../helpers/note.helper';

import SnackbarContentWrapper from '../../components/SnackbarContentWrapper';
import Navbar from '../components/Navbar';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 5,
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 2,
  },
  chooseFileButton: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.notes.tertiary,
    '&:hover': {
      backgroundColor: theme.notes.secondary,
      color: theme.notes.quaternary,
    },
  },
  textField: {
    width: 300,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  select: {
    width: 300,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
    fontFamily: 'Roboto',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class UploadNotesPage extends React.Component {
  state = {
    file: null,
    teachers: [],
    teacher: '',
    subjects: [],
    subject: '',
    departments: [],
    department: {},
    courses: [],
    course: '',
    topic: '',
    description: '',
    semester: '',
    error: '',
    progressPercent: 0,
    uploading: false,
    open: false,
    showLoader: false,
    showTextFields: true,
  };

  componentDidMount () {
    listDepartments ().then (departments => {
      this.setState (() => ({departments}));
    });

    const {user} = isAuthenticated ();
    this.setState (() => ({
      subjects: user.department.subjects,
      department: {value: user.department._id, label: user.department.name},
      courses: user.department.courses,
      teachers: user.department.teachers,
      course: user.course._id,
      subjects: user.course.subjects,
    }));
  }

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

  onDepartmentChange = department => {
    this.setState (() => ({
      department,
      course: '',
      teacher: '',
      showLoader: true,
      showTextFields: false,
    }));
    readDepartment (department.value).then (({courses, teachers}) => {
      this.setState (() => ({
        courses,
        teachers,
        showLoader: false,
        showTextFields: true,
      }));
    });
  };

  onTeacherChange = e => {
    const teacher = e.target.value;
    this.setState (() => ({teacher}));
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onSemesterChange = e => {
    const semester = e.target.value;
    this.setState (() => ({semester}));
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState (() => ({course, subject: ''}));

    readCourse (course).then (({subjects}) => {
      this.setState (() => ({subjects}));
    });
  };

  onSubmit = e => {
    if (
      !this.state.file ||
      !this.state.topic ||
      !this.state.teacher ||
      !this.state.subject ||
      !this.state.semester
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      this.setState (() => ({uploading: true, error: ''}));

      getSAS ('notes').then (sasToken => {
        const {speedSummary, blobName} = upload (
          sasToken,
          this.state.file,
          'notes'
        );

        speedSummary.on ('progress', () => {
          const progressPercent = speedSummary.getCompletePercent ();
          this.setState (() => ({
            progressPercent,
          }));

          if (progressPercent == 100) {
            const {user} = isAuthenticated ();
            const note = {
              name: blobName,
              topic: this.state.topic,
              description: this.state.description,
              department: this.state.department.value,
              course: this.state.course,
              teacher: this.state.teacher,
              subject: this.state.subject,
              semester: this.state.semester,
              uploadedBy: user._id,
            };

            createNote (note).then (data => {
              this.setState (() => ({uploading: false, open: true}));
            });
          }
        });
      });
    }
  };

  handleClose = () => {
    this.setState (() => ({open: false}));
  };

  render () {
    const {classes} = this.props;

    return (
      <div>
        <Navbar />
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
                variant="contained"
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
            </TextField><br />
            <Select
              value={this.state.department}
              placeholder="Select Department"
              className={classes.select}
              options={this.state.departments.map (department => {
                return {value: department._id, label: department.name};
              })}
              onChange={this.onDepartmentChange}
            /><br />

            {this.state.showLoader &&
              <CircularProgress
                className={classes.progress}
                size={24}
                variant="indeterminate"
              />}

            {this.state.showTextFields &&
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
                </TextField><br />
                <TextField
                  className={classes.textField}
                  select
                  value={this.state.teacher}
                  onChange={this.onTeacherChange}
                  margin="normal"
                  label="Teacher"
                  variant="outlined"
                >
                  {this.state.teachers.map (teacher => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </TextField><br />
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
                </TextField><br />
              </div>}

            {this.state.error && <Typography>{this.state.error}</Typography>}
          </CardContent>
          <CardActions>

            {this.state.uploading
              ? <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                >
                  Uploading
                  <CircularProgress
                    className={classes.progress}
                    color="secondary"
                    size={24}
                    variant="indeterminate"
                  />
                </Button>
              : <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.onSubmit}
                  color="primary"
                >
                  Submit
                </Button>}
          </CardActions>
        </Card>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Note Uploaded!!"
            className={classes.margin}
          />
        </Snackbar>

      </div>
    );
  }
}

UploadNotesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (UploadNotesPage);
