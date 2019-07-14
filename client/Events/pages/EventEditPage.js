import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import EventForm from '../components/EventForm';
import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {readEvent, editEvent} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';
import SnackbarComponent from '../../components/SnackbarComponent';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(15),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(15),
      padding: theme.spacing(2),
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
    done: false,
  };

  componentDidMount = async () => {
    const {eventId} = this.props.match.params;
    const {token} = isAuthenticated();
    const event = await readEvent(eventId, token);
    this.setState(() => ({event}));
  };

  onSubmit = async (data, cb, id) => {
    await editEvent(id, data);
    cb();
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
            Dashboard
          </Typography>

          <Divider />
          {this.state.event && (
            <EventForm event={this.state.event} onSubmit={this.onSubmit} />
          )}
        </div>

        {this.state.done && (
          <SnackbarComponent
            variant="success"
            message="Event updated!"
            onClose={this.onSnackbarClose}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EventEditPage);
