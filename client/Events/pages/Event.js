import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ClockIcon from '@material-ui/icons/WatchLater';
import PeopleIcon from '@material-ui/icons/People';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/styles';

import {readEvent} from '../../api/event';
import {getSAS, download} from '../../api/upload.api';
import {isAuthenticated} from '../../helpers/auth';
import ArticleEditor from '../components/ArticleEditor';
import getEditorState from '../../helpers/getEditorState';
import EventAbout from '../components/EventAbout';

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
  },
  mainInfo: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  mainInfoTitle: {
    marginLeft: theme.spacing(1),
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
      <div className={classes.root}>
        {event && (
          <div>
            <Card>
              {posterLink && <CardMedia component="img" src={posterLink} />}
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {event.title}
                </Typography>

                <Divider />

                <div className={classes.mainInfo}>
                  <PeopleIcon color="primary" />
                  <Typography
                    variant="body2"
                    color="primary"
                    component="p"
                    className={classes.mainInfoTitle}
                  >
                    3 Going
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
              </CardContent>
            </Card>

            <AppBar position="static">
              <Tabs value={this.state.tab} onChange={this.onTabChange}>
                <Tab label="About" />
                <Tab label="Discussion" />
              </Tabs>
            </AppBar>
            {this.state.tab === 0 && <EventAbout event={event} />}
            {this.state.tab === 1 && console.log('1')}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Event);
