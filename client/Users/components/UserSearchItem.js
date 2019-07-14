import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
});

const UserSearchItem = props => {
  const {classes, user} = props;
  return (
    <Link to={`/users/${user._id}`} key={user._id} className={classes.link}>
      <ListItem>
        <ListItemAvatar>
          {user.avatar ? (
            <Avatar
              src={`http://${window.location.host}/api/users/${
                user._id
              }/avatar`}
            />
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItem>
    </Link>
  );
};

export default withStyles(styles)(UserSearchItem);
