import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import {listNotifications} from '../../api/notification';
import NotificationListItem from './NotificationListItem';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing (10),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (10),
    },
  },
  title: {
    fontWeight: 300,
  },
});

class NotificationList extends React.Component {
  state = {
    notifications: [],
  };

  componentDidMount = async () => {
    const notifications = await listNotifications ();
    this.setState (() => ({notifications}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        {this.state.notifications.length > 0 &&
          this.state.notifications.map (n => {
            return <NotificationListItem notification={n} key={n._id} />;
          })}
      </div>
    );
  }
}

export default withStyles (styles) (NotificationList);
