import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import NotesFilter from '../components/NotesFilter';
import NotesList from '../components/NotesList';

import NotesNav from '../components/NotesNav';
import Filter from '../components/Filter';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 20,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  title: {
    fontWeight: 300,
    color: theme.notes.primary,
  },
  filters: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
  },
});

class NotesPage extends React.Component {
  onDialogOpen = () => {
    this.setState(() => ({openDialog: true}));
  };

  render() {
    const queryString = this.props.location.search;
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Notes'} />

        <NotesNav />
        <div className={classes.root}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Notes
          </Typography>
          <Divider />

          <div className={classes.filters}>
            <Filter history={this.props.history} queryString={queryString} />
          </div>

          <NotesList queryString={queryString} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NotesPage);
