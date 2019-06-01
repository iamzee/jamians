import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
});

const DiscussionListItem = ({discussion, classes}) => {
  return (
    <Link className={classes.link} to={`/discussion/${discussion._id}`}>
      <ListItem button>
        <ListItemText
          primary={discussion.title}
          secondary={discussion.createdBy.name}
        />
      </ListItem>
      <Divider />
    </Link>
  );
};

export default withStyles (styles) (DiscussionListItem);
