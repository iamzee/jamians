import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import EventsNav from '../components/EventsNav';
import {listEvents} from '../../api/event.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import MyEditor from '../components/MyEditor';

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
    fontFamily: 'Roboto',
  },
  container: {
    marginTop: theme.spacing.unit * 2,
    margin: 'auto',
  },
  title: {
    fontWeight: 300,
  },
  card: {
    maxWidth: 345,
  },
  slider: {
    maxWidth: 345,
  },
});

class EventsListPage extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    const {token} = isAuthenticated();

    listEvents(token).then(events => {
      this.setState(() => ({events}));
    });
  }

  render() {
    const {classes} = this.props;
    const settings = {
      dots: true,
      infinite: true,
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
            Dashboard
          </Typography>

          <Divider />

          <div className={classes.container}>
            <Slider {...settings} className={classes.slider}>
              {this.state.events.length > 0 &&
                this.state.events.map(event => {
                  return (
                    <Card key={event._id} className={classes.card}>
                      {event.poster && (
                        <CardMedia component="img" src={event.poster} />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h5">
                          {event.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          style={{fontWeight: 400}}
                        >
                          <MyEditor rawContent={event.article} />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton aria-label="Bookmark">
                          <BookmarkIcon />
                        </IconButton>
                        <IconButton aria-label="Bookmark">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Bookmark">
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsListPage);
