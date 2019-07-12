import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    marginTop: theme.spacing(2),
  },
});

class Comment extends React.Component {
  render() {
    const {comment, classes} = this.props;
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
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Comment);
