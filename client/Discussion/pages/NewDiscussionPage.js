import React from 'react';

import DiscussionNav from '../components/DiscussionNav';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {newDiscussion} from '../../api/discussion.api';
import {isAuthenticated} from '../../helpers/auth.helper';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 5,
  },
  textField: {
    width: '100%',
  },
});

class NewDiscussionPage extends React.Component {
  state = {
    title: '',
  };

  onTitleChange = e => {
    const title = e.target.value;
    this.setState (() => ({title}));
  };

  handleSubmit = e => {
    const {token} = isAuthenticated ();
    const {title} = this.state;
    newDiscussion (token, title);
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <DiscussionNav />

        <div className={classes.container}>
          <Typography variant="h6">
            Start Discussion
          </Typography>
          <TextField
            value={this.state.title}
            onChange={this.onTitleChange}
            className={classes.textField}
            label="Title"
            variant="outlined"
            multiline
            rows="3"
          />
          <Button onClick={this.handleSubmit}>Add</Button>
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (NewDiscussionPage);
