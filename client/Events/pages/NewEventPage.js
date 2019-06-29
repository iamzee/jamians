import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import EventForm from '../components/EventForm';
import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
// import {isAuthenticated} from '../../api/auth.api';
import {isAuthenticated} from '../../helpers/auth';
import {createEvent} from '../../api/event';
import {getSAS, upload} from '../../api/upload.api';
import SnackbarComponent from '../../components/SnackbarComponent';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  title: {
    fontWeight: 300,
  },
});

class NewEventPage extends React.Component {
  state = {
    done: false,
  };

  onSubmit = async (event, cb) => {
    const {token} = isAuthenticated();
    if (event.poster) {
      getSAS('events').then(sasToken => {
        const {speedSummary, blobName} = upload(
          sasToken,
          event.poster,
          'events'
        );

        speedSummary.on('progress', async () => {
          const progressPercent = speedSummary.getCompletePercent();

          if (progressPercent == 100) {
            await createEvent({...event, poster: blobName}, token);
            cb();
            this.setState(() => ({done: true}));
          }
        });
      });
    } else {
      await createEvent({...event, poster: null}, token);
      cb();
      this.setState(() => ({done: true}));
    }
  };

  onSnackbarClose = () => {
    this.setState(() => ({done: false}));
  };

  render() {
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

          <EventForm onSubmit={this.onSubmit} />
        </div>

        {this.state.done && (
          <SnackbarComponent
            variant="success"
            message="Event added!"
            onClose={this.onSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(NewEventPage);
