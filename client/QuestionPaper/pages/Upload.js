import React from 'react';
import Select from 'react-select';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {semesters} from '../../helpers/note.helper';
import {listDepartments, readDepartment} from '../../api/department.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import {years} from '../../helpers/questionPaper.helper';
import {getSAS, upload} from '../../api/upload.api';
import {createQuestionPaper} from '../../api/questionPaper.api';

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
    color: theme.questionPaper.primary,
  },
  chooseFileButton: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.questionPaper.tertiary,
    '&:hover': {
      backgroundColor: theme.questionPaper.secondary,
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
    fontFamily: 'Roboto',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.questionPaper.primary,
    color: '#fff',

    '&:hover': {
      backgroundColor: theme.questionPaper.secondary,
    },
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.questionPaper.tertiary,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class Upload extends React.Component {
  state = {
    file: null,
    semester: '',
    departments: [],
    subjects: [],
    department: null,
    subject: null,
    year: '',
    error: '',
    progressPercent: 0,
    uploading: false,
  };

  componentDidMount () {
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

  onSemesterChange = e => {
    const semester = e.target.value;
    console.log (semester);
    this.setState (() => ({semester}));
  };

  onDepartmentChange = department => {
    this.setState (() => ({department, subject: null}));

    readDepartment (department.value).then (({subjects}) => {
      this.setState (() => ({subjects}));
    });
  };

  onSubjectChange = subject => {
    this.setState (() => ({subject}));
  };

  onYearChange = e => {
    const year = e.target.value;
    this.setState (() => ({year}));
  };

  onSubmit = e => {
    if (
      !this.state.semester ||
      !this.state.department ||
      !this.state.subject ||
      !this.state.year ||
      !this.state.file
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      this.setState (() => ({uploading: true, error: ''}));

      getSAS ('question-papers').then (sasToken => {
        const {speedSummary, blobName} = upload (
          sasToken,
          this.state.file,
          'question-papers'
        );

        speedSummary.on ('progress', () => {
          const progressPercent = speedSummary.getCompletePercent ();
          this.setState (() => ({
            progressPercent,
          }));

          if (progressPercent == 100) {
            const {user} = isAuthenticated ();
            const questionPaper = {
              name: blobName,
              department: this.state.department.value,
              subject: this.state.subject.value,
              semester: this.state.semester,
              year: this.state.year,
              uploadedBy: user._id,
            };

            createQuestionPaper (questionPaper).then (data => {
              this.setState (() => ({uploading: false, open: true}));
            });
          }
        });
      });
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>

        <Navbar />

        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h5">
              Upload Question Paper
            </Typography>
            <input
              accept="application/pdf"
              type="file"
              id="file-upload"
              className={classes.fileInput}
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
              value={this.state.semester}
              onChange={this.onSemesterChange}
              className={classes.textField}
              select
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
            <TextField
              className={classes.textField}
              select
              value={this.state.year}
              onChange={this.onYearChange}
              margin="normal"
              label="Question Paper Year"
              variant="outlined"
            >
              {years.map (year => (
                <MenuItem key={year.value} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <Select
              className={classes.select}
              value={this.state.department}
              placeholder="Select Department"
              options={this.state.departments.map (department => {
                return {
                  value: department._id,
                  label: department.name,
                };
              })}
              onChange={this.onDepartmentChange}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#e23e57',
                  primary: '#522546',
                },
              })}
            />
            <br />
            <Select
              className={classes.select}
              value={this.state.subject}
              placeholder="Select Subject"
              options={this.state.subjects.map (subject => {
                return {
                  value: subject._id,
                  label: subject.name,
                };
              })}
              onChange={this.onSubjectChange}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#e23e57',
                  primary: '#522546',
                },
              })}
            />
            <br />
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
                    size={24}
                    variant="indeterminate"
                  />
                </Button>
              : <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.onSubmit}
                >
                  Upload
                </Button>}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles (styles) (Upload);
