import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import NotesList from '../components/NotesList';

import NotesNav from '../components/NotesNav';
import Filter from '../components/Filter';
import styles from '../styles/NotesPage.styles';

class NotesPage extends React.Component {
  onDialogOpen = () => {
    this.setState (() => ({openDialog: true}));
  };

  render () {
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

export default withStyles (styles) (NotesPage);
