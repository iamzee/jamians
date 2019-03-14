import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
    color: theme.notes.quaternary,
  },
  appbar: {
    backgroundColor: theme.notes.primary,
  },
  iconButton: {
    marginRight: theme.spacing.unit,
    color: theme.notes.quaternary,
  },
  list: {
    width: 250,
  },
  listTitle: {
    ...theme.mixins.gutters (),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class Navbar extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = open => () => {
    this.setState (() => ({open}));
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
              <IconButton
                className={classes.iconButton}
                onClick={this.toggleDrawer (true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.grow}>
                Notes
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Drawer open={this.state.open} onClose={this.toggleDrawer (false)}>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={this.toggleDrawer (false)}
              onClick={this.toggleDrawer (false)}
            >
              <div className={classes.list}>
                <Paper className={classes.listTitle}>
                  <Typography variant="h5">
                    Notes Mania
                  </Typography>
                </Paper>
                <Divider variant="middle" />
                <List>
                  <ListItem button>
                    <Link to="/notes">
                      <ListItemText primary={'Notes'} />
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link to="/notes/upload">
                      <ListItemText primary={'Upload Notes'} />
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link to="/notes/bookmarks">
                      <ListItemText primary={'Bookmarks'} />
                    </Link>
                  </ListItem>
                </List>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (Navbar);
