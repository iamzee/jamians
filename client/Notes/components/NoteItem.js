import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
  listItem: {
    color: 'black',
    '&:hover': {
      backgroundColor: theme.palette.tertiary,
    },
  },
});

class NoteItem extends React.Component {
  render() {
    const {note, classes} = this.props;

    return (
      <Link to={`/notes/${note._id}`} className={classes.link}>
        <ListItem button className={classes.listItem}>
          <ListItemText primary={note.topic} secondary={note.description} />
        </ListItem>
      </Link>
    );
  }
}

export default withStyles(styles)(NoteItem);
