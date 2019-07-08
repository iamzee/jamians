import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {getBookmarks} from '../../api/event';

// import EventsList from '../components/EventsList';

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
  container: {
    marginTop: theme.spacing.unit * 2,
    margin: 'auto',
  },
  title: {
    fontWeight: 300,
  },
  slider: {
    maxWidth: 345,
  },
});

class EventBookmarksPage extends React.Component {
  state = {
    events: [],
  };

  componentDidMount () {
    getBookmarks ().then (events => {
      this.setState (() => ({events}));
    });
  }

  render () {
    const {classes} = this.props;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: 'slides',
    };
    return (
      <div>
        <Navbar title={'Events'} />
        <EventsNav />

        <div className={classes.root}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Bookmarks
          </Typography>

          <Divider />

          <div className={classes.container}>
            {/* <Slider {...settings} className={classes.slider}>
              {this.state.events.length > 0 &&
                this.state.events.map (event => {
                  return <EventsList key={event._id} event={event} />;
                })}
            </Slider> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (EventBookmarksPage);
