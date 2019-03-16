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
import {listTeachers} from '../../api/teacher.api';
import {listDepartments, readDepartment} from '../../api/department.api';
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
    teacher: null,
    subjects: [],
    subject: null,
    departments: [],
    department: {},
    topic: '',
    description: '',
    semester: '',
    error: '',
    progressPercent: 0,
    uploading: false,
    open: false,
  };

  componentDidMount () {
    listTeachers ().then (teachers => {
      this.setState (() => ({teachers}));
    });

    listDepartments ().then (departments => {
      this.setState (() => ({departments}));
    });

    const {user} = isAuthenticated ();
    this.setState (() => ({
      subjects: user.department.subjects,
      department: {value: user.department._id, label: user.department.name},
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
    this.setState (() => ({department}));

    readDepartment (department.value).then (({subjects}) => {
      this.setState (() => ({subjects}));
    });
  };

  onTeacherChange = teacher => {
    this.setState (() => ({teacher}));
  };

  onSubjectChange = subject => {
    this.setState (() => ({subject}));
  };

  onSemesterChange = e => {
    const semester = e.target.value;
    this.setState (() => ({semester}));
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
      this.setState (() => ({uploading: true}));

      getSAS ().then (sasToken => {
        const {speedSummary, blobName} = upload (sasToken, this.state.file);

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
              teacher: this.state.teacher.value,
              subject: this.state.subject.value,
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
        <Navbar title={'Notes Mania'} />
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h5">
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
            <br /><TextField
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
            <Select
              placeholder="Select Teacher"
              className={classes.select}
              options={this.state.teachers.map (teacher => {
                return {value: teacher._id, label: teacher.name};
              })}
              onChange={this.onTeacherChange}
            /><br />
            <Select
              placeholder="Select Subject"
              className={classes.select}
              options={this.state.subjects.map (subject => {
                return {
                  value: subject._id,
                  label: subject.name,
                };
              })}
              onChange={this.onSubjectChange}
            />
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
