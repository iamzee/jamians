import React from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
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

class NotesNav extends React.Component {
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
        <Button onClick={this.toggleDrawer (true)}>Open</Button>
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
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles (styles) (NotesNav);
