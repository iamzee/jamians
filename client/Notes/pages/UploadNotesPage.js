import React from 'react';
import PropTypes from 'prop-types';

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
import {listDepartments} from '../../api/department.api';
import {listCourses} from '../../api/course.api';
import {listSubjects} from '../../api/subject.api';
import {createNote} from '../../api/note.api';
import {isAuthenticated} from '../../api/auth.api';
import {semesters} from '../../helpers/note.helper';

import SnackbarContentWrapper from '../../components/SnackbarContentWrapper';
import Navbar from '../../components/Navbar';
import NotesNav from '../components/NotesNav';

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
    open: false,
    showCourseLoader: false,
    showSubjectLoader: false,
    showCourses: false,
    showSubjects: false,
  };

  componentDidMount () {
    listDepartments ().then (departments => {
      this.setState (() => ({
        departments,
      }));
    });
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

  onDepartmentChange = e => {
    const department = e.target.value;

    this.setState (() => ({
      department,
      course: '',
      showCourseLoader: true,
      showCourses: false,
      showSubjects: false,
    }));

    listCourses (department).then (courses => {
      this.setState (() => ({
        courses,
        showCourseLoader: false,
        showCourses: true,
      }));
    });
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState (() => ({course, subject: ''}));
  };

  onSemesterChange = e => {
    const semester = e.target.value;
    this.setState (() => ({showSubjectLoader: true, semester}));

    listSubjects (this.state.course, semester).then (subjects => {
      this.setState (() => ({
        showSubjects: true,
        showSubjectLoader: false,
        subjects,
      }));
    });
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onSubmit = e => {
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
            isAuthenticated ().then (user => {
              const note = {
                name: blobName,
                topic: this.state.topic,
                description: this.state.description,
                department: this.state.department,
                course: this.state.course,
                subject: this.state.subject,
                semester: this.state.semester,
                uploadedBy: user._id,
              };

              createNote (note).then (data => {
                this.setState (() => ({uploading: false, open: true}));
              });
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
                <br />
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
