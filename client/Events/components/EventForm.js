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
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

import ArticleEditor from './ArticleEditor';
import SnackbarComponent from '../../components/SnackbarComponent';
import getEditorState from '../../helpers/getEditorState';
import {eventCategory} from '../../helpers/event';

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
    width: theme.spacing(40),
    height: 'auto',
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
    file: this.props.event
      ? this.props.event.poster
        ? `http://${window.location.host}/api/events/${
            this.props.event._id
          }/poster`
        : null
      : null,
    fileChange: false,
    startDate: this.props.event
      ? this.props.event.startDate
        ? moment(this.props.event.startDate)
        : null
      : null,
    startDateFocused: false,
    endDate: this.props.event
      ? this.props.event.endDate
        ? moment(this.props.event.endDate)
        : null
      : null,
    endDateFocused: false,
    error: '',
    adding: false,
    category: this.props.event ? this.props.event.category : '',
    registration: this.props.event
      ? this.props.event.registration
        ? this.props.event.registration
        : ''
      : '',
    done: false,
  };

  onChange = editorState => {
    this.setState(() => ({editorState}));
  };

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({title}));
  };

  onCategoryChange = e => {
    const category = e.target.value;
    this.setState(() => ({category}));
  };

  onRegistrationChange = e => {
    const registration = e.target.value;
    this.setState(() => ({registration}));
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
    if (!this.state.title || !this.state.category) {
      this.setState(() => ({
        error: 'Title, Description and Category are required.',
      }));
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
          poster:
            this.state.file && typeof this.state.file !== 'string'
              ? this.state.file
              : '',
          startDate: this.state.startDate ? this.state.startDate : '',
          endDate: this.state.endDate ? this.state.endDate : '',
          category: this.state.category,
          registration: this.state.registration,
        };

        await this.props.onSubmit(
          event,
          () => {
            this.setState(() => ({
              adding: false,
              done: true,
            }));
          },
          this.props.event ? this.props.event._id : ''
        );
      }
    }
  };

  onSnackbarClose = () => {
    this.setState(() => ({error: '', done: false}));
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
            />
          </div>
        </div>

        <TextField
          select
          label="Category"
          value={this.state.category}
          onChange={this.onCategoryChange}
          variant="outlined"
          margin="normal"
          className={classes.textField}
        >
          {eventCategory.map(c => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
        <br />

        <TextField
          label="Registration Link"
          value={this.state.registration}
          onChange={this.onRegistrationChange}
          variant="outlined"
          margin="normal"
          className={classes.textField}
        />
        <br />

        <div className={classes.posterUploadSection}>
          {this.state.file ? (
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <img
                  className={classes.image}
                  src={
                    typeof this.state.file === 'string'
                      ? this.state.file
                      : URL.createObjectURL(this.state.file)
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
            placeholder={'Starts'}
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
            placeholder={'Ends'}
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
            {this.props.event ? 'Save' : 'Add Event'}
          </Button>
        )}

        {this.state.error && (
          <SnackbarComponent
            variant="error"
            message={this.state.error}
            onClose={this.onSnackbarClose}
          />
        )}

        {this.state.done && (
          <SnackbarComponent
            variant="success"
            message={'Event added successfully.'}
            onClose={this.onSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EventForm);
