import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload.api';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(5),
  },
});

class EventListCard extends React.Component {
  state = {
    posterLink: '',
  };

  componentDidMount = async () => {
    if (this.props.event.poster) {
      const token = await getSAS('events');
      const posterLink = download(token, 'events', this.props.event.poster);
      this.setState(() => ({posterLink}));
    }
  };

  render() {
    const {classes, event} = this.props;
    return (
      <Card className={classes.card}>
        {this.state.posterLink && (
          <CardMedia component="img" src={this.state.posterLink} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Created By
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.startDate && moment(event.startDate).format('ddd, MMMM DD')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary">Interested</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(EventListCard);
