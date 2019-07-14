import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(5),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
});

const EventListCard = props => {
  const {classes, event} = props;
  return (
    <Card className={classes.card}>
      {event.poster && (
        <CardMedia
          component="img"
          src={`http://${window.location.host}/api/events/${event._id}/poster`}
        />
      )}
      <CardContent>
        <Link to={`/events/${event._id}`} className={classes.link}>
          <Typography gutterBottom variant="h5">
            {event.title}
          </Typography>
        </Link>

        <Typography variant="body2" color="primary" component="p">
          {event.startDate && moment(event.startDate).format('ddd, MMMM DD')}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.createdBy.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(EventListCard);
