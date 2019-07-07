import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';

import {semesters} from '../../helpers/notes';
import {listDepartments} from '../../api/department';
import {listCourses} from '../../api/course';
import {listSubjects} from '../../api/subject';
import {years} from '../../helpers/questionPaper';
import {getSAS, upload} from '../../api/upload';
import {createQuestionPaper} from '../../api/questionPaper';

import styles from '../styles/upload.style';
import Navbar from '../../components/Navbar';
import QuestionPaperNav from '../components/QuestionPaperNav';
import SnackbarComponent from '../../components/SnackbarComponent';

class Upload extends React.Component {
  state = {
    file: null,
    semester: '',
    departments: [],
    subjects: [],
    department: '',
    subject: '',
    courses: [],
    course: '',
    year: '',
    error: '',
    progressPercent: 0,
    uploading: false,
    uploaded: false,
    showCourseLoader: false,
    showCourses: false,
    showSubjectLoader: false,
    showSubjects: false,
    showSemesters: false,
    showSemestersLoading: false,
    openSnackbar: false,
  };

  componentDidMount = async () => {
    const departments = await listDepartments ();
    this.setState (() => ({departments}));
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
    this.setState (() => ({showSemestersLoading: true, showSemesters: false}));
    const course = e.target.value;
    this.setState (() => ({
      course,
      subject: '',
      showSemesters: true,
      showSemestersLoading: false,
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

  onFileChange = e => {
    const file = e.target.files[0];
    this.setState (() => ({file}));
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onYearChange = e => {
    const year = e.target.value;
    this.setState (() => ({year}));
  };

  onSubmit = async e => {
    if (
      !this.state.semester ||
      !this.state.department ||
      !this.state.course ||
      !this.state.subject ||
      !this.state.year ||
      !this.state.file
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else if (this.state.file.type !== 'application/pdf') {
      this.setState (() => ({error: 'Upload only pdf file.'}));
    } else {
      this.setState (() => ({uploading: true, error: ''}));

      const sasToken = await getSAS ('question-papers');

      const {speedSummary, blobName} = await upload (
        sasToken,
        this.state.file,
        'question-papers'
      );

      speedSummary.on ('progress', async () => {
        const progressPercent = speedSummary.getCompletePercent ();
        this.setState (() => ({
          progressPercent,
        }));

        if (progressPercent == 100) {
          const questionPaper = {
            name: blobName,
            year: this.state.year,
          };

          await createQuestionPaper (
            questionPaper,
            this.state.department,
            this.state.course,
            this.state.semester,
            this.state.subject
          );
          this.setState (() => ({uploading: false, uploaded: true}));
        }
      });
    }
  };

  onSnackbarClose = () => {
    this.setState (() => ({error: ''}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Question Papers'} />
        <QuestionPaperNav />

        <div className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} variant="h4">
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
                  variant="outlined"
                  component="span"
                  color="secondary"
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

                  {this.state.showSemestersLoading &&
                    <CircularProgress
                      className={classes.progress}
                      size={24}
                      variant="indeterminate"
                    />}

                  {this.state.showSemesters &&
                    <React.Fragment>
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
                    </React.Fragment>}

                </div>}

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
            </CardContent>
            <CardActions>
              {this.state.uploading
                ? <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    color="secondary"
                  >
                    Uploading
                    <CircularProgress
                      className={classes.progress}
                      size={24}
                      variant="indeterminate"
                      color="inherit"
                    />
                  </Button>
                : <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.onSubmit}
                    color="secondary"
                  >
                    Upload
                  </Button>}
            </CardActions>
          </Card>
        </div>
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

export default withStyles (styles) (Upload);
