import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import EventForm from '../components/EventForm';
import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {isAuthenticated} from '../../api/auth.api';
import {createEvent} from '../../api/event.api';
import {getSAS, upload} from '../../api/upload.api';

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
});

class NewEventPage extends React.Component {
  onSubmit = (title, rawContentString, file) => {
    if (file) {
      getSAS ('events').then (sasToken => {
        const {speedSummary, blobName} = upload (sasToken, file, 'events');

        speedSummary.on ('progress', () => {
          const progressPercent = speedSummary.getCompletePercent ();

          if (progressPercent == 100) {
            isAuthenticated ().then (user => {
              const event = {
                title,
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
        title,
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

          <EventForm onSubmit={this.onSubmit} />
        </div>

      </div>
    );
  }
}

export default withStyles (styles) (NewEventPage);
