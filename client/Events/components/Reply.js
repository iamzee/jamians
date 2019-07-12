import React from 'react';
import moment from 'moment';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  // author: {
  //   color: theme.palette.primary.main,
  // },
});

class Reply extends React.Component {
  render() {
    const {reply, classes} = this.props;
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                // className={clsx(
                //   comment.createdBy._id === comment.event.createdBy &&
                //     classes.author
                // )}
                variant="subtitle2"
                component="span"
              >
                {reply.createdBy.name}
              </Typography>
              &ndash;
              <Typography variant="caption" component="span">
                {moment(reply.createdAt).format('MMM DD, hh:mm A')}
              </Typography>
            </React.Fragment>
          }
          secondary={<Typography variant="subtitle1">{reply.text}</Typography>}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(Reply);
