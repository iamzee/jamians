import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload.api';
// import {isAuthenticated} from '../../api/auth';
import {isAuthenticated} from '../../helpers/auth';
import {readUser} from '../../api/user.api';
import BookmarkButton from './BookmarkButton';
import ArticleEditor from './ArticleEditor';

const styles = theme => ({
  card: {
    marginTop: theme.spacing(2),
    maxWidth: 350,
    margin: 'auto',
  },
});

class EventCard extends React.Component {
  state = {
    posterLink: '',
    user: {},
  };

  componentDidMount() {
    if (this.props.event.poster) {
      getSAS('events').then(token => {
        const posterLink = download(token, 'events', this.props.event.poster);
        this.setState(() => ({posterLink}));
      });
    } else {
      this.setState(() => ({posterLink: ''}));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.event._id !== prevProps.event._id) {
      if (this.props.event.poster) {
        getSAS('events').then(token => {
          const posterLink = download(token, 'events', this.props.event.poster);
          this.setState(() => ({posterLink}));
        });
      } else {
        this.setState(() => ({posterLink: ''}));
      }
    }
  }

  render() {
    const {classes, event} = this.props;
    const {user} = isAuthenticated();

    return (
      <Card key={event._id} className={classes.card}>
        <CardHeader
          // avatar={<Avatar src={user.profilePicture} />}
          title={user.name}
          subheader={moment(event.createdAt).format('MMMM MM, YYYY')}
        />
        {this.state.posterLink && (
          <CardMedia component="img" src={this.state.posterLink} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {event.title}
          </Typography>
          <Typography variant="subtitle2" style={{fontWeight: 400}}>
            <ArticleEditor
              readOnly={true}
              rawContent={event.body}
              onChange={() => {}}
            />
          </Typography>
        </CardContent>
        <CardActions>
          {/* <BookmarkButton event={event} /> */}
          {event.createdBy === isAuthenticated().user._id && (
            <React.Fragment>
              <Link to={`/events/${event._id}/edit`}>
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton aria-label="Bookmark">
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          )}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(EventCard);
