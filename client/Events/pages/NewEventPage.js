import React from 'react';
import Editor from 'draft-js-plugins-editor';
import {EditorState, RichUtils, convertToRaw} from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';

import IconButton from '@material-ui/core/IconButton';
import BoldIcon from '@material-ui/icons/FormatBoldOutlined';
import ItalicIcon from '@material-ui/icons/FormatItalicOutlined';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {createEvent} from '../../api/event.api';
import {isAuthenticated} from '../../api/auth.api';
import {getSAS, upload} from '../../api/upload.api';

const linkifyPlugin = createLinkifyPlugin ();

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('sm')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  title: {
    fontWeight: 300,
  },
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

class NewEventPage extends React.Component {
  state = {
    editorState: EditorState.createEmpty (),
    text: EditorState.createEmpty (),
    title: '',
    file: null,
  };

  onTitleChange = e => {
    const title = e.target.value;
    this.setState (() => ({title}));
  };

  onFileChange = e => {
    const file = e.target.files[0];
    console.log (file);
    this.setState (() => ({file}));
  };

  onChange = editorState => {
    this.setState (() => ({editorState}));
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand (editorState, command);

    if (newState) {
      this.onChange (newState);
      return 'handled';
    }
    return 'not-handled';
  };

  _onBoldClick = () => {
    this.onChange (
      RichUtils.toggleInlineStyle (this.state.editorState, 'BOLD')
    );
  };

  _onItalicClick = () => {
    this.onChange (
      RichUtils.toggleInlineStyle (this.state.editorState, 'ITALIC')
    );
  };

  onSubmit = () => {
    const rawContent = convertToRaw (
      this.state.editorState.getCurrentContent ()
    );
    const rawContentString = JSON.stringify (rawContent);

    if (this.state.file) {
      getSAS ('events').then (sasToken => {
        const {speedSummary, blobName} = upload (
          sasToken,
          this.state.file,
          'events'
        );

        speedSummary.on ('progress', () => {
          const progressPercent = speedSummary.getCompletePercent ();

          if (progressPercent == 100) {
            isAuthenticated ().then (user => {
              const event = {
                title: this.state.title,
                article: rawContentString,
                poster: blobName,
              };

              createEvent (event);
            });
          }
        });
      });
    } else {
      const event = {
        title: this.state.title,
        article: rawContentString,
      };
      createEvent (event);
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Events'} />
        <EventsNav />

        <div className={classes.root}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            New Event
          </Typography>

          <Divider />

          <TextField
            margin="normal"
            variant="outlined"
            label="Event Title"
            value={this.state.title}
            onChange={this.onTitleChange}
            className={classes.textField}
          />

          <div className={classes.aticleContainer}>
            <div>
              <IconButton onClick={this._onBoldClick}>
                <BoldIcon />
              </IconButton>
              <IconButton onClick={this._onItalicClick}>
                <ItalicIcon />
              </IconButton>
            </div>
            <div className={classes.editor}>
              <Editor
                placeholder="Enter event details..."
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                plugins={[linkifyPlugin]}
              />
            </div>
          </div>

          <div className={classes.fileUploadSection}>
            <img
              className={classes.image}
              src={this.state.file && URL.createObjectURL (this.state.file)}
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
      </div>
    );
  }
}

export default withStyles (styles) (NewEventPage);
