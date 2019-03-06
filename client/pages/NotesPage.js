import React from 'react';

import NoteItem from '../components/NoteItem';
import {listNotes, getFilteredNotes} from '../api/note.api';
import FilterNotes from '../components/FilterNotes';
import NotesNav from '../components/NotesNav';
import NavBar from '../components/NavBar';

class NotesPage extends React.Component {
  state = {
    filteredNotes: [],
  };

  componentDidMount () {
    listNotes ().then (notes => {
      this.setState (() => ({filteredNotes: notes}));
    });
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log ('this.state', this.state);
  //   console.log ('nextState', nextState);
  //   return true;
  // }

  getSubjectId = subjectId => {
    getFilteredNotes (subjectId).then (notes => {
      this.setState (() => ({filteredNotes: notes}));
    });
  };

  render () {
    return (
      <div>
        <NavBar title={'Notes Mania'} />
        <NotesNav />
        <FilterNotes getSubjectId={this.getSubjectId} />
        {this.state.filteredNotes.map (note => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    );
  }
}

export default NotesPage;
