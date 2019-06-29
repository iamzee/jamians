import React from 'react';
import {convertToRaw, EditorState} from 'draft-js';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload.api';
import ArticleEditor from './ArticleEditor';
import SnackbarComponent from '../../components/SnackbarComponent';
import getEditorState from '../../helpers/getEditorState';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  aticleContainer: {
    border: '2px solid black',
    borderRadius: '3px',
    minHeight: theme.spacing(50),
    fontFamily: 'Roboto',
    marginTop: theme.spacing(2),
  },
  editor: {
    padding: theme.spacing(2),
  },
  fileUpload: {
    display: 'none',
  },
  posterUploadSection: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: theme.spacing(40),
    width: theme.spacing(40),
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  textField: {
    width: '100%',
  },
  datePicker: {
    marginTop: theme.spacing(2),
  },
  submitButton: {marginTop: theme.spacing(2)},
  progress: {marginLeft: theme.spacing(2)},
});

class EventForm extends React.Component {
  state = {
    editorState: this.props.event
      ? getEditorState(this.props.event.body)
      : EditorState.createEmpty(),
    title: this.props.event ? this.props.event.title : '',
    file: null,
    posterLink: null,
    fileChange: false,
    startDate: null,
    startDateFocused: false,
    endDate: null,
    endDateFocused: false,
    error: '',
    adding: false,
  };

  componentDidMount() {
    const {event} = this.props;
    if (event) {
      if (event.poster) {
        getSAS('events').then(token => {
          const posterLink = download(token, 'events', this.props.event.poster);
          this.setState(() => ({
            posterLink,
          }));
        });
      }

      if (event.startDate) {
        this.setState(() => ({startDate: moment(this.props.event.startDate)}));
      }

      if (event.endDate) {
        this.setState(() => ({endDate: moment(this.props.endDate)}));
      }
    }
  }

  onChange = editorState => {
    this.setState(() => ({editorState}));
  };

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({title}));
  };

  onFileChange = e => {
    const file = e.target.files[0];
    console.log(file);
    this.setState(() => ({file, fileChange: true}));
  };

  onRemovePoster = () => {
    this.setState(() => ({file: null}));
  };

  onSubmit = async () => {
    if (!this.state.title) {
      this.setState(() => ({error: 'Title is required.'}));
    } else {
      if (
        this.state.startDate &&
        this.state.endDate &&
        moment(this.state.endDate).isBefore(this.state.startDate)
      ) {
        this.setState(() => ({error: 'Error in start date and end date.'}));
      } else {
        this.setState(() => ({adding: true}));

        const rawContent = convertToRaw(
          this.state.editorState.getCurrentContent()
        );
        const rawContentString = JSON.stringify(rawContent);

        const event = {
          title: this.state.title,
          body: rawContentString,
          poster: this.state.file,
          startDate: this.state.startDate && this.state.startDate,
          endDate: this.state.endDate && this.state.endDate,
        };

        await this.props.onSubmit(
          event,
          () => {
            this.setState(() => ({
              adding: false,
            }));
          },
          this.state.fileChange,
          this.props.event.poster
        );
      }
    }
  };

  onSnackbarClose = () => {
    this.setState(() => ({error: ''}));
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
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
              editorState={this.state.editorState}
              // rawContent={this.state.rawContent}
            />
          </div>
        </div>

        <div className={classes.posterUploadSection}>
          {this.state.file || this.state.posterLink ? (
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <img
                  className={classes.image}
                  src={
                    this.state.file
                      ? URL.createObjectURL(this.state.file)
                      : this.state.posterLink
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" onClick={this.onRemovePoster}>
                  Remove Poster
                </Button>
              </Grid>
            </Grid>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </div>
        <div className={classes.datePicker}>
          <SingleDatePicker
            date={this.state.startDate}
            onDateChange={startDate => this.setState(() => ({startDate}))}
            focused={this.state.startDateFocused}
            onFocusChange={({focused}) =>
              this.setState(() => ({startDateFocused: focused}))
            }
            id="123"
            numberOfMonths={1}
            showClearDate={true}
            placeholder={'Start Date'}
          />
        </div>

        <div className={classes.datePicker}>
          <SingleDatePicker
            date={this.state.endDate}
            onDateChange={endDate => this.setState(() => ({endDate}))}
            focused={this.state.endDateFocused}
            onFocusChange={({focused}) =>
              this.setState(() => ({endDateFocused: focused}))
            }
            id="1233"
            numberOfMonths={1}
            showClearDate={true}
            placeholder={'End Date'}
          />
        </div>

        {this.state.adding ? (
          <Button
            variant="contained"
            color="secondary"
            className={classes.submitButton}
          >
            Adding
            <CircularProgress
              color="inherit"
              size={20}
              className={classes.progress}
            />
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={this.onSubmit}
            color="secondary"
            className={classes.submitButton}
          >
            Add Event
          </Button>
        )}

        {this.state.error && (
          <SnackbarComponent
            variant="error"
            message={this.state.error}
            onClose={this.onSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EventForm);
