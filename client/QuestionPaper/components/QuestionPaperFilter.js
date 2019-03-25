import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import {withStyles} from '@material-ui/core/styles';

import styles from '../styles/questionPaperFilter.style';
import {isAuthenticated} from '../../helpers/auth.helper';
import {semesters} from '../../helpers/note.helper';

class QuestionPaperFilter extends React.Component {
  state = {
    subjects: [],
    subject: '',
    semester: '',
    department: '',
    course: '',
    open: false,
  };

  componentDidMount () {
    const {user} = isAuthenticated ();
    this.setState (() => ({
      department: user.department._id,
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

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onSemesterChange = e => {
    const semester = e.target.value;
    this.setState (() => ({semester}));
  };

  handleClearSubject = () => {
    this.setState (() => ({subject: ''}));
  };

  handleClearSemester = () => {
    this.setState (() => ({semester: ''}));
  };

  onApplyFilter = () => {
    if (this.state.subject && this.state.semester) {
      this.props.history.push (
        `/question_papers?departmentId=${this.state.department}&courseId=${this.state.course}&subjectId=${this.state.subject}&semester=${this.state.semester}`
      );
    } else if (this.state.subject) {
      this.props.history.push (
        `/question_papers?departmentId=${this.state.department}&courseId=${this.state.course}&subjectId=${this.state.subject}`
      );
    } else if (this.state.semester) {
      this.props.history.push (
        `/question_papers?departmentId=${this.state.department}&courseId=${this.state.course}&semester=${this.state.semester}`
      );
    } else {
      this.props.history.push (
        `/question_papers?departmentId=${this.state.department}&courseId=${this.state.course}`
      );
    }
    this.setState (() => ({open: false}));
  };

  handleClearFilter = () => {
    this.setState (() => ({subject: '', semester: ''}));

    this.props.history.push (
      `/question_papers?departmentId=${this.state.department}&courseId=${this.state.course}`
    );

    this.setState (() => ({open: false}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Button
          variant="contained"
          onClick={this.onOpen}
          className={classes.filterButton}
        >
          Filter
        </Button>
        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onClose={this.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Filter Question Papers
          </DialogTitle>

          <DialogContent>
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

            <br />
            <TextField
              className={classes.textField}
              select
              value={this.state.semester}
              onChange={this.onSemesterChange}
              margin="normal"
              label="Semester"
            >
              {semesters.map (semester => (
                <MenuItem key={semester.value} value={semester.value}>
                  {semester.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button className={classes.actionButton} onClick={this.onClose}>
              Cancel
            </Button>
            <Button
              className={classes.actionButton}
              onClick={this.handleClearFilter}
            >
              Clear Filter
            </Button>
            <Button
              className={classes.actionButton}
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

export default withStyles (styles) (QuestionPaperFilter);
