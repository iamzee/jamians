import React from 'react';

import DiscussionNav from '../components/DiscussionNav';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {newDiscussion} from '../../api/discussion.api';
import Navbar from '../../components/Navbar';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
  },
  title: {
    fontWeight: 300,
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
    const {title} = this.state;
    newDiscussion (title);
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Discussions'} />
        <DiscussionNav />

        <div className={classes.container}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Start Discussion
          </Typography>

          <Divider />
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
