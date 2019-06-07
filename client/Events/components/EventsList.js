import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload.api';
import MyEditor from './MyEditor';
import {isAuthenticated} from '../../api/auth.api';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
});

class EventsList extends React.Component {
  state = {
    posterLink: '',
    user: {},
  };

  componentDidMount () {
    getSAS ('events').then (token => {
      const posterLink = download (token, 'events', this.props.event.poster);
      this.setState (() => ({posterLink}));
    });
    isAuthenticated ().then (user => {
      this.setState (() => ({user}));
    });
  }

  render () {
    const {classes, event} = this.props;
    const {user} = this.state;
    console.log (this.props.event.poster);
    return (
      <Card key={event._id} className={classes.card}>
        <CardHeader
          avatar={<Avatar src={user.profilePicture} />}
          title={user.name}
          subheader={moment (event.createdAt).format ('MMMM MM, YYYY')}
        />
        {this.state.posterLink &&
          <CardMedia component="img" src={this.state.posterLink} />}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {event.title}
          </Typography>
          <Typography variant="subtitle2" style={{fontWeight: 400}}>
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
  }
}

export default withStyles (styles) (EventsList);
