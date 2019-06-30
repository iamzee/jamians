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

const styles = theme => ({
  card: {
    marginTop: theme.spacing(2),
  },
});

class DiscussionListItem extends React.Component {
  state = {
    expanded: false,
  };

  setExpanded = () => {
    this.setState(() => ({expanded: !this.state.expanded}));
  };

  render() {
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
          subheader={moment(discussion.createdAt).format('MMMM DD, hh:mm A')}
        />
        <CardContent>
          <Typography variant="h5">{discussion.text}</Typography>
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
            <AddComment discussion={discussion} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(DiscussionListItem);
