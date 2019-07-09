import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import {withStyles} from '@material-ui/core/styles';

import AddComment from './AddComment';
import CommentList from './CommentList';
import {isAuthenticated} from '../../helpers/auth';
import {listComment, addComment} from '../../api/event';

const styles = theme => ({
  card: {
    marginTop: theme.spacing (2),
  },
});

class DiscussionListItem extends React.Component {
  state = {
    expanded: false,
    comments: [],
  };

  componentDidMount = async () => {
    const {token} = isAuthenticated ();
    const comments = await listComment (
      this.props.discussion.event,
      this.props.discussion._id,
      token
    );
    this.setState (() => ({comments}));
  };

  onSubmit = async text => {
    const {discussion} = this.props;
    const {token} = isAuthenticated ();
    const comment = await addComment (
      {text},
      discussion.event,
      discussion._id,
      token
    );
    this.setState (() => ({comments: [comment, ...this.state.comments]}));
  };

  setExpanded = () => {
    this.setState (() => ({expanded: !this.state.expanded}));
  };

  render () {
    const {discussion, classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar>
              <PersonIcon />
            </Avatar>
          }
          title={discussion.createdBy.name}
          subheader={moment (discussion.createdAt).format ('MMMM DD, hh:mm A')}
        />
        <CardContent>
          <Typography variant="h6">{discussion.text}</Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={this.setExpanded}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <CommentIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <AddComment onSubmit={this.onSubmit} />
            {this.state.comments.length > 0 &&
              <CommentList comments={this.state.comments} />}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles (styles) (DiscussionListItem);
