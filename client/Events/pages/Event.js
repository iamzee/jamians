import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ClockIcon from '@material-ui/icons/WatchLater';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/styles';

import {readEvent} from '../../api/event';
import {getSAS, download} from '../../api/upload.api';
import {isAuthenticated} from '../../helpers/auth';
import EventAbout from '../components/EventAbout';
import GoingButton from '../components/GoingButton';
import BookmarkButton from '../components/BookmarkButton';
import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import EventDiscussion from '../components/EventDiscussion';

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
  },
  mainInfo: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  mainInfoTitle: {
    marginLeft: theme.spacing(1),
  },
  groupButtons: {
    marginBottom: theme.spacing(2),
  },
});

class Event extends React.Component {
  state = {
    event: null,
    posterLink: '',
    tab: 0,
  };

  componentDidMount = async () => {
    const {eventId} = this.props.match.params;
    const {token} = isAuthenticated();
    const event = await readEvent(eventId, token);

    if (event.poster) {
      const token = await getSAS('events');
      const posterLink = download(token, 'events', event.poster);
      this.setState(() => ({posterLink}));
    }

    this.setState(() => ({event}));
  };

  onTabChange = (e, newValue) => {
    this.setState(() => ({tab: newValue}));
  };

  render() {
    const {classes} = this.props;
    const {event, posterLink} = this.state;
    return (
      <div>
        <Navbar title={'Events'} />
        <EventsNav />

        <div className={classes.root}>
          {event && (
            <div>
              <Card>
                {posterLink && <CardMedia component="img" src={posterLink} />}
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {event.title}
                  </Typography>

                  <div className={classes.groupButtons}>
                    <GoingButton event={event} />
                    <BookmarkButton event={event} />
                  </div>

                  <Divider />

                  <div className={classes.mainInfo}>
                    <PeopleIcon color="primary" />
                    <Typography
                      variant="body2"
                      color="primary"
                      component="p"
                      className={classes.mainInfoTitle}
                    >
                      {`${event.going.length} Going`}
                    </Typography>
                  </div>

                  <div className={classes.mainInfo}>
                    <ClockIcon color="primary" />
                    <Typography
                      variant="body2"
                      color="primary"
                      component="p"
                      className={classes.mainInfoTitle}
                    >
                      {event.startDate &&
                        moment(event.startDate).format('ddd, MMMM DD')}
                    </Typography>
                  </div>

                  <div className={classes.mainInfo}>
                    <CategoryIcon color="primary" />
                    <Typography
                      variant="body2"
                      color="primary"
                      component="p"
                      className={classes.mainInfoTitle}
                    >
                      {event.category}
                    </Typography>
                  </div>
                </CardContent>
              </Card>

              <AppBar position="static" color="secondary">
                <Tabs value={this.state.tab} onChange={this.onTabChange}>
                  <Tab label="About" />
                  <Tab label="Discussion" />
                </Tabs>
              </AppBar>
              {this.state.tab === 0 && <EventAbout event={event} />}
              {this.state.tab === 1 && <EventDiscussion event={event} />}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Event);
