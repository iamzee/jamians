import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';

import {listNotes} from '../../api/notes';

import NoNotes from './NoNotes';
import Loader from '../../components/Loader';
import NoteItem from './NoteItem';

class NotesList extends React.Component {
  state = {
    notes: [],
    noNotes: false,
  };

  componentDidMount() {
    const query = queryString.parse(this.props.queryString);
    console.log('First', query);

    listNotes(query).then(notes => {
      console.log(notes);
      this.setState(() => ({notes}));

      if (notes.length === 0) {
        this.setState(() => ({noNotes: true}));
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.queryString !== prevProps.queryString) {
      this.setState(() => ({notes: []}));
      const parsed = queryString.parse(this.props.queryString);
      listNotes(parsed).then(notes => {
        this.setState(() => ({notes, noNotes: false}));

        if (notes.length === 0) {
          this.setState(() => ({noNotes: true}));
        }
      });

      console.log('Second', this.props.queryString);
    }
  }

  render() {
    return (
      <div>
        {this.state.noNotes ? (
          <NoNotes />
        ) : (
          <div>
            {this.state.notes.length === 0 ? (
              <Loader color="#00adb5" />
            ) : (
              <List>
                {this.state.notes.map(note => (
                  <NoteItem key={note._id} note={note} />
                ))}
              </List>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default NotesList;
