import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import {withStyles} from '@material-ui/core/styles';

import {getSignedUrl, upload} from '../api/upload.api';
import {listTeachers} from '../api/teacher.api';
import {listSubjects} from '../api/subject.api';
import {createNote} from '../api/note.api';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  textField: {
    width: 300,
  },
  fileInput: {
    display: 'none',
  },
});

class UploadNotesPage extends React.Component {
  state = {
    file: null,
    teachers: [],
    teacher: '',
    subjects: [],
    subject: '',
    topic: '',
    description: '',
    error: '',
  };

  componentDidMount () {
    listTeachers ().then (teachers => {
      this.setState (() => ({teachers}));
    });

    listSubjects ().then (subjects => {
      this.setState (() => ({subjects}));
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

  onTeacherChange = e => {
    const teacher = e.target.value;
    this.setState (() => ({teacher}));
  };

  onSubjectChange = e => {
    const subject = e.target.value;
    this.setState (() => ({subject}));
  };

  onSubmit = e => {
    if (
      !this.state.file ||
      !this.state.topic ||
      !this.state.teacher ||
      !this.state.subject
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      getSignedUrl ().then (data => {
        upload (data.url, this.state.file).then (response => {
          const note = {
            topic: this.state.topic,
            description: this.state.description,
            note_url: data.key,
            uploadedBy: this.props.user._id,
            teacher: this.state.teacher,
            subject: this.state.subject,
          };

          createNote (note).then (data => {
            console.log (data);
          });
        });
      });
    }
  };

  render () {
    const {classes} = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">Upload Notes</Typography>
          <input
            accept="application/pdf"
            className={classes.fileInput}
            type="file"
            id="file-upload"
            onChange={this.onFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" color="secondary" component="span">
              Choose File
            </Button>
          </label>
          <br />
          <TextField
            className={classes.textField}
            label="Topic"
            value={this.state.topic}
            onChange={this.onTopicChange}
          />
          <br />
          <TextField
            className={classes.textField}
            label="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <br />
          <TextField
            className={classes.textField}
            select
            value={this.state.teacher}
            onChange={this.onTeacherChange}
            helperText="Filter by teacher"
            margin="normal"
            label="Teacher"
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
            helperText="Filter by subject"
            margin="normal"
            label="Subject"
          >
            {this.state.subjects.map (subject => (
              <MenuItem key={subject._id} value={subject._id}>
                {subject.name}
              </MenuItem>
            ))}
          </TextField><br />
          {this.state.error && <Typography>{this.state.error}</Typography>}
        </CardContent>
        <CardActions>
          <Button onClick={this.onSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

UploadNotesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect (mapStateToProps) (
  withStyles (styles) (UploadNotesPage)
);
