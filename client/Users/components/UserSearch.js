import React from 'react';
import {Link} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth';
import {listUsers} from '../../api/user';

const styles = theme => ({
  textField: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
});

class UserSearch extends React.Component {
  state = {
    users: [],
    input: '',
    expanded: false,
    filteredUsers: [],
  };

  componentDidMount = async () => {
    const {token} = isAuthenticated();
    const users = await listUsers(token);
    this.setState(() => ({users, filteredUsers: users}));
  };

  onInputChange = e => {
    const input = e.target.value;

    if (input.length > 0) {
      const filteredUsers = this.state.users.filter(user =>
        user.name.toLowerCase().includes(input.toLowerCase())
      );
      this.setState(() => ({expanded: true, filteredUsers}));
    } else if (input.length === 0) {
      this.setState(() => ({expanded: false}));
    }

    this.setState(() => ({input}));
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <TextField
          placeholder="Find People..."
          variant="outlined"
          margin="normal"
          className={classes.textField}
          value={this.state.input}
          onChange={this.onInputChange}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Paper>
            {this.state.filteredUsers.length > 0 &&
              this.state.filteredUsers.map(user => {
                return (
                  <Link
                    to={`/users/${user._id}`}
                    key={user._id}
                    className={classes.link}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.name} />
                    </ListItem>
                  </Link>
                );
              })}
          </Paper>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(UserSearch);
