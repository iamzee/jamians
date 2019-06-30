import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    marginTop: theme.spacing(2),
  },
});

class DiscussionListItem extends React.Component {
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
      </Card>
    );
  }
}

export default withStyles(styles)(DiscussionListItem);
