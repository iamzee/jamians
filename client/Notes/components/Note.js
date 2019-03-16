import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {read} from '../../api/note.api';
import {getSAS, download} from '../../api/upload.api';

import BookmarkButton from './BookmarkButton';
import Navbar from './Navbar';
import Loader from '../../components/Loader';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
  contentBody: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    color: theme.notes.tertiary,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: theme.notes.tertiary,
      color: '#fff',
    },
  },
});

class Note extends React.Component {
  state = {
    note: null,
  };

  componentDidMount () {
    const {noteId} = this.props.match.params;
    read (noteId).then (note => {
      this.setState (() => ({note}));
    });
  }

  onView = () => {
    getSAS ().then (token => {
      const downloadLink = download (token, this.state.note.name);
      window.open (downloadLink, '_blank');
    });
  };

  render () {
    const {note} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <Navbar />
        {note
          ? <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" gutterBottom>{note.topic}</Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {note.description}
                </Typography>
                <Divider />
                <div className={classes.contentBody}>
                  <Typography variant="caption">
                    Uploaded On:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {moment (note.uploadedOn).format ('Mo MMM YYYY')}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Semester:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>{note.semester}</span>
                  </Typography>
                  <Typography variant="caption">
                    Uploaded By:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {note.uploadedBy.name}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Subject:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {note.subject.name}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Teacher:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {note.teacher.name}
                    </span>
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button className={classes.button} onClick={this.onView}>
                  View
                </Button>
                <BookmarkButton note={note} />
              </CardActions>
            </Card>
          : <Loader color="#00adb5" />}

      </div>
    );
  }
}

export default withStyles (styles) (Note);
