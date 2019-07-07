import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload';
import {readUser} from '../../api/user';
import {isAuthenticated} from '../../helpers/auth';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing (5),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
});

class EventListCard extends React.Component {
  state = {
    posterLink: '',
    author: '',
  };

  componentDidMount = async () => {
    if (this.props.event.poster) {
      const token = await getSAS ('events');
      const posterLink = download (token, 'events', this.props.event.poster);
      this.setState (() => ({posterLink}));
    }

    const {token} = isAuthenticated ();
    const {name} = await readUser (this.props.event.createdBy, token);
    this.setState (() => ({author: name}));
  };

  render () {
    const {classes, event} = this.props;
    return (
      <Card className={classes.card}>
        {this.state.posterLink &&
          <CardMedia component="img" src={this.state.posterLink} />}
        <CardContent>
          <Link to={`/events/${event._id}`} className={classes.link}>
            <Typography gutterBottom variant="h5">
              {event.title}
            </Typography>
          </Link>

          <Typography variant="body2" color="primary" component="p">
            {event.startDate &&
              moment (event.startDate).format ('ddd, MMMM DD')}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.state.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.category}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary">Interested</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles (styles) (EventListCard);
