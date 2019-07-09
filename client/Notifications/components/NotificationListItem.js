import React from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import {withStyles} from '@material-ui/core/styles';

import {markSeen} from '../../api/notification';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  listItem: {
    marginTop: theme.spacing (2),
  },
  unseen: {
    background: '#e6f8f9',
  },
});

class NotificationListItem extends React.Component {
  onItemClick = async () => {
    await markSeen (this.props.notification._id);
  };

  render () {
    const {notification: n, classes} = this.props;
    return (
      <div>
        <Link to={n.link} className={classes.link}>
          <ListItem
            onClick={this.onItemClick}
            className={clsx (classes.listItem, !n.seen && classes.unseen)}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={n.message}
              secondary={moment (n.createdAt).format ('ddd, Do MMM')}
            />
          </ListItem>
        </Link>
      </div>
    );
  }
}

export default withStyles (styles) (NotificationListItem);
