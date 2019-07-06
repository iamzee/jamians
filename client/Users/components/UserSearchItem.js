import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';

import {getSAS, download} from '../../api/upload';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
});

class UserSearchItem extends React.Component {
  state = {
    posterLink: null,
  };

  componentDidMount = async () => {
    if (this.props.user.avatar) {
      const sasToken = await getSAS('avatar');
      const posterLink = download(sasToken, 'avatar', this.props.user.avatar);
      this.setState(() => ({posterLink}));
    }
  };

  render() {
    const {classes, user} = this.props;
    return (
      <Link to={`/users/${user._id}`} key={user._id} className={classes.link}>
        <ListItem>
          <ListItemAvatar>
            {this.state.posterLink ? (
              <Avatar src={this.state.posterLink} />
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
  }
}

export default withStyles(styles)(UserSearchItem);
