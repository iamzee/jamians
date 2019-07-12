import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

import ReplyForm from './ReplyForm';
import Reply from './Reply';
import {addReply} from '../../api/event';

const styles = theme => ({
  card: {
    marginTop: theme.spacing(2),
  },
});

class Comment extends React.Component {
  state = {
    expanded: false,
    replies: this.props.comment.replies.sort((a, b) => {
      if (moment(a.createdAt).isBefore(b.createdAt)) {
        return 1;
      }

      return -1;
    }),
  };

  setExpanded = () => {
    this.setState(() => ({expanded: !this.state.expanded}));
  };

  addReply = async (reply, cb) => {
    const event = await addReply(
      this.props.eventId,
      this.props.comment._id,
      reply
    );
    const comment = event.comments.find(
      comment => comment._id.toString() === this.props.comment._id.toString()
    );
    this.setState(() => ({
      replies: comment.replies.sort((a, b) => {
        if (moment(a.createdAt).isBefore(b.createdAt)) {
          return 1;
        }

        return -1;
      }),
    }));
    cb();
  };

  render() {
    const {comment, classes} = this.props;
    const {expanded} = this.state;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            title={comment.createdBy.name}
            subheader={moment(comment.createdAt).format('MMMM DD, hh:mm A')}
          />
          <CardContent>
            <Typography variant="h6">{comment.text}</Typography>
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
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <ReplyForm addReply={this.addReply} />
              {this.state.replies.map(reply => (
                <Reply reply={reply} key={reply._id} />
              ))}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Comment);
