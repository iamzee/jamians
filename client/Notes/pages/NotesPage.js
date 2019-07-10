import React from 'react';
import queryString from 'query-string';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import NotesList from '../components/NotesList';

import NotesNav from '../components/NotesNav';
import Filter from '../components/Filter';
import styles from '../styles/NotesPage.styles';

import {isAuthenticated} from '../../helpers/auth';

class NotesPage extends React.Component {
  componentDidMount () {
    const {user} = isAuthenticated ();

    if (
      user.department &&
      !queryString.parse (this.props.location.search).department
    ) {
      this.props.history.push (
        `/notes?department=${user.department}&course=${user.course}&semester=&subject=`
      );
    }
  }

  onDialogOpen = () => {
    this.setState (() => ({openDialog: true}));
  };

  render () {
    const query = this.props.location.search;
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
            <Filter history={this.props.history} query={query} />
          </div>

          <NotesList query={query} />
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (NotesPage);
