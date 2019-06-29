import React from 'react';
import queryString from 'query-string';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {withStyles} from '@material-ui/core/styles';

import {listEvents} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';
import EventListCard from './EventListCard';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(15),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(15),
      padding: theme.spacing(1),
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
});

class EventList extends React.Component {
  state = {
    events: [],
  };

  componentDidMount = async () => {
    let {skip} = queryString.parse(this.props.location.search);
    if (skip === '0' || !skip) {
      this.props.history.push('/events?skip=0&limit=1');
    }
    const {token} = isAuthenticated();
    const events = await listEvents(skip, token);
    this.setState(() => ({events}));
  };

  onPrev = async () => {
    let {skip} = queryString.parse(this.props.location.search);
    this.props.history.push(`/events?skip=${parseInt(skip, 10) - 1}&limit=1`);
  };

  onNext = async () => {
    let {skip} = queryString.parse(this.props.location.search);
    this.props.history.push(`/events?skip=${parseInt(skip, 10) + 1}&limit=1`);
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
        <div>
          {/* {this.state.events.length > 0 && (
            <EventListCard event={this.state.events[0]} />
          )} */}
          {this.state.events.lenght > 0 && (
            <React.Fragment>
              {this.state.events.map(e => {
                <p key={e._id}>{e.title}</p>;
              })}
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
    );
  }
}

export default withStyles(styles)(EventList);
