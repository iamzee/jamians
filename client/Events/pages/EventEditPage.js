import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import EventForm from '../components/EventForm';
import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {readEvent, updateEvent} from '../../api/event.api';
import {getSAS, upload} from '../../api/upload.api';
import {isAuthenticated} from '../../api/auth.api';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('sm')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
    fontFamily: 'Roboto',
  },
  title: {
    fontWeight: 300,
  },
});

class EventEditPage extends React.Component {
  state = {
    event: null,
  };

  componentDidMount () {
    const {eventId} = this.props.match.params;
    readEvent (eventId).then (event => {
      this.setState (() => ({event}));
    });
  }

  onSubmit = (title, rawContentString, file, fileChange) => {
    if (file && fileChange) {
      getSAS ('events').then (sasToken => {
        const {speedSummary, blobName} = upload (sasToken, file, 'events');

        speedSummary.on ('progress', () => {
          const progressPercent = speedSummary.getCompletePercent ();

          if (progressPercent == 100) {
            const event = {
              title,
              article: rawContentString,
              poster: blobName,
            };

            updateEvent (this.state.event._id, event);
          }
        });
      });
    } else {
      const event = {
        title,
        article: rawContentString,
      };
      updateEvent (this.state.event._id, event);
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
            Dashboard
          </Typography>

          <Divider />
          {this.state.event &&
            <EventForm event={this.state.event} onSubmit={this.onSubmit} />}
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (EventEditPage);
