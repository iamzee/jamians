import React from 'react';

import NotificationList from '../components/NotificationList';
import Navbar from '../../components/Navbar';

class NotificationDashboard extends React.Component {
  render () {
    return (
      <div>
        <Navbar title="Notifications" />

        <NotificationList />
      </div>
    );
  }
}

export default NotificationDashboard;
