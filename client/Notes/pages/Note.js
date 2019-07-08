import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {readNote} from '../../api/notes';
import {getSAS, download} from '../../api/upload';
import BookmarkButton from '../components/BookmarkButton';
import Navbar from '../../components/Navbar';
import PageLoader from '../../components/PageLoader';
import NotesNav from '../components/NotesNav';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
  },

  container: {
    marginTop: theme.spacing (20),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (15),
    },
  },
  contentBody: {
    marginTop: theme.spacing (2),
  },
  button: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing (2),
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
    },
  },
});

class Note extends React.Component {
  state = {
    note: null,
  };

  componentDidMount = async () => {
    const {noteId} = this.props.match.params;
    const note = await readNote (noteId);
    this.setState (() => ({note}));
  };

  onView = async () => {
    const sasToken = getSAS ('notes');
    const downloadLink = download (sasToken, 'notes', this.state.note.name);
    window.open (downloadLink, '_blank');
  };

  render () {
    const {note} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <Navbar title={'Notes'} />
        <NotesNav />
        <div className={classes.container}>
          {note
            ? <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {note.topic}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {note.description}
                  </Typography>
                  <Divider />
                  <div className={classes.contentBody}>
                    <Typography variant="caption">
                      Uploaded On:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {moment (note.uploadedOn).format ('Mo MMM YYYY')}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Uploaded By:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.createdBy.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Semester:{' '}
                      <span style={{fontWeight: 'bold'}}>{note.semester}</span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Department:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.department.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Course:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.course.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Subject:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.subject.name}
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
            : <PageLoader />}
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (Note);
