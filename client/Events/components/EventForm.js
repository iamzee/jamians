import React from 'react';
import {convertToRaw, EditorState} from 'draft-js';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload.api';
import ArticleEditor from './ArticleEditor';

const styles = theme => ({
  aticleContainer: {
    border: '2px solid black',
    borderRadius: '3px',
    minHeight: theme.spacing.unit * 30,
    fontFamily: 'Roboto',
    marginTop: theme.spacing.unit * 2,
  },
  editor: {
    padding: theme.spacing.unit * 2,
  },
  fileUpload: {
    display: 'none',
  },
  fileUploadSection: {
    marginTop: theme.spacing.unit * 2,
  },
  image: {
    height: theme.spacing.unit * 40,
    width: theme.spacing.unit * 40,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  textField: {
    width: '100%',
  },
});

class EventForm extends React.Component {
  state = {
    editorState: EditorState.createEmpty (),
    title: '',
    file: null,
    posterLink: null,
    rawContent: null,
    fileChange: false,
  };

  componentDidMount () {
    const {event} = this.props;
    if (event) {
      if (event.poster) {
        getSAS ('events').then (token => {
          const posterLink = download (
            token,
            'events',
            this.props.event.poster
          );
          this.setState (() => ({
            posterLink,
          }));
        });
      }

      this.setState (() => ({title: event.title, rawContent: event.article}));
    }
  }

  onChange = editorState => {
    this.setState (() => ({editorState}));
  };

  onTitleChange = e => {
    const title = e.target.value;
    this.setState (() => ({title}));
  };

  onFileChange = e => {
    const file = e.target.files[0];
    console.log (file);
    this.setState (() => ({file, fileChange: true}));
  };

  onSubmit = () => {
    const rawContent = convertToRaw (
      this.state.editorState.getCurrentContent ()
    );
    const rawContentString = JSON.stringify (rawContent);

    this.props.onSubmit (
      this.state.title,
      rawContentString,
      this.state.file,
      this.state.fileChange
    );
  };

  render () {
    const {classes} = this.props;
    return (
      <div>

        <TextField
          margin="normal"
          variant="outlined"
          label="Event Title"
          value={this.state.title}
          onChange={this.onTitleChange}
          className={classes.textField}
        />

        <div className={classes.aticleContainer}>
          <div className={classes.editor}>
            <ArticleEditor
              readOnly={false}
              onChange={this.onChange}
              rawContent={this.state.rawContent}
            />
          </div>
        </div>

        <div className={classes.fileUploadSection}>
          <img
            className={classes.image}
            src={
              this.state.file
                ? URL.createObjectURL (this.state.file)
                : this.state.posterLink
            }
          />
          <br />
          <input
            onChange={this.onFileChange}
            className={classes.fileUpload}
            type="file"
            id="poster"
          />
          <label htmlFor="poster">
            <Button variant="outlined" component="span">
              Add Poster
            </Button>
          </label>
        </div>

        <Button variant="contained" onClick={this.onSubmit}>
          Add Event
        </Button>
      </div>
    );
  }
}

export default withStyles (styles) (EventForm);
