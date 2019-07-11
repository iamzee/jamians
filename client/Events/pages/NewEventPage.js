import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import EventForm from '../components/EventForm';
import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {createEvent} from '../../api/event';
import SnackbarComponent from '../../components/SnackbarComponent';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(15),
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(15),
      padding: theme.spacing(2),
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
    await createEvent(event);
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
