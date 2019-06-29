import React from 'react';
import queryString from 'query-string';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {listEvents} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';
import EventListCard from '../components/EventListCard';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(15),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(15),
      padding: 0,
    },
    fontFamily: 'Roboto',
  },
  container: {
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
  title: {
    fontWeight: 300,
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
  },
  eventsList: {marginTop: theme.spacing(2)},
});

class EventsDashboard extends React.Component {
  state = {
    events: [],
  };

  componentDidMount = async () => {
    let {skip} = queryString.parse(this.props.location.search);
    if (skip === '0' || !skip) {
      this.props.history.push('/events?skip=0&limit=2');
    }
    const {token} = isAuthenticated();
    const events = await listEvents(skip, token);
    this.setState(() => ({events}));
  };

  onPrev = async () => {
    let {skip} = queryString.parse(this.props.location.search);
    this.props.history.push(`/events?skip=${parseInt(skip, 10) - 2}&limit=2`);
  };

  onNext = async () => {
    let {skip} = queryString.parse(this.props.location.search);
    this.props.history.push(`/events?skip=${parseInt(skip, 10) + 2}&limit=2`);
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.location.search !== this.props.location.search) {
      const {skip} = queryString.parse(this.props.location.search);
      const {token} = isAuthenticated();
      const events = await listEvents(skip, token);
      this.setState(() => ({events}));
    }
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

          <div className={classes.eventsList}>
            {this.state.events.length > 0 && (
              <React.Fragment>
                {this.state.events.map(e => (
                  <EventListCard key={e._id} event={e} />
                ))}
              </React.Fragment>
            )}
          </div>

          <div className={classes.buttonGroup}>
            <ButtonGroup color="secondary" size="large">
              <Button
                disabled={
                  queryString.parse(this.props.location.search).skip === '0'
                }
                onClick={this.onPrev}
              >
                Prev
              </Button>
              <Button onClick={this.onNext}>Next</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsDashboard);
