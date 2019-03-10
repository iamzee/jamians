import React from 'react';
import Select from 'react-select';

import NoteItem from '../components/NoteItem';
import {listNotes, getFilteredNotes} from '../api/note.api';
import NotesNav from '../components/NotesNav';
import NavBar from '../components/NavBar';

import {listSubjects} from '../api/subject.api';

class NotesPage extends React.Component {
  state = {
    subjects: [],
    subjectId: null,
    filteredNotes: [],
  };

  componentDidMount () {
    listNotes ().then (notes => {
      this.setState (() => ({filteredNotes: notes}));
    });

    listSubjects ().then (subjects => {
      this.setState (() => ({subjects}));
    });
  }

  onSubjectChange = e => {
    const subjectId = e.value;
    getFilteredNotes (subjectId).then (notes => {
      this.setState (() => ({filteredNotes: notes}));
    });
  };

  render () {
    return (
      <div>
        <NavBar title={'Notes Mania'} />
        <NotesNav />
        <Select
          placeholder="Search notes by Subject"
          options={this.state.subjects.map (subject => {
            return {
              value: subject._id,
              label: subject.name,
            };
          })}
          onChange={this.onSubjectChange}
        />
        {this.state.filteredNotes.map (note => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    );
  }
}

export default NotesPage;
