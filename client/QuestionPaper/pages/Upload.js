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

import {semesters} from '../../helpers/note.helper';
import {listDepartments, readDepartment} from '../../api/department.api';
import {readCourse} from '../../api/course.api';
import {isAuthenticated} from '../../api/auth.api';
import {years} from '../../helpers/questionPaper.helper';
import {getSAS, upload} from '../../api/upload.api';
import {createQuestionPaper} from '../../api/questionPaper.api';

import styles from '../styles/upload.style';
import Navbar from '../../components/Navbar';
import QuestionPaperNav from '../components/QuestionPaperNav';
import SnackbarContentWrapper from '../../components/SnackbarContentWrapper';

class Upload extends React.Component {
  state = {
    file: null,
    semester: '',
    departments: [],
    subjects: [],
    filteredSubjects: [],
    department: '',
    subject: '',
    courses: [],
    course: '',
    year: '',
    error: '',
    progressPercent: 0,
    uploading: false,
    showCourseLoader: false,
    showCourses: false,
    showSubjectLoader: false,
    showSubjects: false,
    openSnackbar: false,
  };

  componentDidMount() {
    listDepartments().then(departments => {
      this.setState(() => ({
        departments,
      }));
    });
  }

  onFileChange = e => {
    const file = e.target.files[0];
    this.setState(() => ({file}));
  };

  onSemesterChange = e => {
    this.setState(() => ({showSubjectLoader: true}));
    const semester = e.target.value;
    this.setState(() => ({
      semester,
      filteredSubjects: this.state.subjects.filter(s => {
        return s.semester === semester;
      }),
      showSubjects: true,
      showSubjectLoader: false,
    }));
  };

  onDepartmentChange = e => {
    const department = e.target.value;
    this.setState(() => ({
      department,
      course: '',
      showCourseLoader: true,
      showCourses: false,
      showSubjects: false,
    }));
    readDepartment(department).then(({courses}) => {
      this.setState(() => ({
        courses,
        showCourseLoader: false,
        showCourses: true,
      }));
    });
  };

  onCourseChange = e => {
    const course = e.target.value;
    this.setState(() => ({course, subject: ''}));

    readCourse(course).then(({subjects}) => {
      this.setState(() => ({
        subjects,
        filteredSubjects: subjects,
        showSubjects: false,
      }));
    });
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState(() => ({subject}));
  };

  onYearChange = e => {
    const year = e.target.value;
    this.setState(() => ({year}));
  };

  onSubmit = e => {
    if (
      !this.state.semester ||
      !this.state.department ||
      !this.state.course ||
      !this.state.subject ||
      !this.state.year ||
      !this.state.file
    ) {
      this.setState(() => ({error: 'All fields are necessary!'}));
    } else if (this.state.file.type !== 'application/pdf') {
      this.setState(() => ({error: 'Upload only pdf file.'}));
    } else {
      this.setState(() => ({uploading: true, error: ''}));

      getSAS('question-papers').then(sasToken => {
        const {speedSummary, blobName} = upload(
          sasToken,
          this.state.file,
          'question-papers'
        );

        speedSummary.on('progress', () => {
          const progressPercent = speedSummary.getCompletePercent();
          this.setState(() => ({
            progressPercent,
          }));

          if (progressPercent == 100) {
            isAuthenticated().then(user => {
              const questionPaper = {
                name: blobName,
                department: this.state.department,
                course: this.state.course,
                subject: this.state.subject,
                semester: this.state.semester,
                year: this.state.year,
                uploadedBy: user._id,
              };

              createQuestionPaper(questionPaper).then(data => {
                this.setState(() => ({uploading: false, openSnackbar: true}));
              });
            });
          }
        });
      });
    }
  };

  handleSnackbarClose = () => {
    this.setState(() => ({openSnackbar: false}));
  };

  render() {
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
                  variant="contained"
                  component="span"
                >
                  Choose File
                </Button>
              </label>
              {this.state.file && (
                <Typography variant="subtitle2">
                  {this.state.file.name}
                </Typography>
              )}
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
                {this.state.departments.map(d => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>
              <br />

              {this.state.showCourseLoader && (
                <CircularProgress
                  className={classes.progress}
                  size={24}
                  variant="indeterminate"
                />
              )}

              {this.state.showCourses && (
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
                    {this.state.courses.map(course => (
                      <MenuItem key={course._id} value={course._id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    {semesters.map(semester => (
                      <MenuItem key={semester.value} value={semester.value}>
                        {semester.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {this.state.showSubjectLoader && (
                    <CircularProgress
                      className={classes.progress}
                      size={24}
                      variant="indeterminate"
                    />
                  )}

                  {this.state.showSubjects && (
                    <TextField
                      className={classes.textField}
                      select
                      value={this.state.subject}
                      onChange={this.onSubjectChange}
                      margin="normal"
                      label="Subject"
                      variant="outlined"
                    >
                      {this.state.filteredSubjects.map(subject => (
                        <MenuItem key={subject._id} value={subject._id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  <br />
                </div>
              )}

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
                {years.map(year => (
                  <MenuItem key={year.value} value={year.value}>
                    {year.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />

              {this.state.error && <Typography>{this.state.error}</Typography>}
            </CardContent>
            <CardActions>
              {this.state.uploading ? (
                <Button
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
              ) : (
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.onSubmit}
                >
                  Upload
                </Button>
              )}
            </CardActions>
          </Card>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="success"
            message="Question Paper Uploaded!!"
            className={classes.margin}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(Upload);
