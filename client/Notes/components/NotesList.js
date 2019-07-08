import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';

import {listNotes} from '../../api/notes';
import NoNotes from './NoNotes';
import NoteItem from './NoteItem';
import PageLoader from '../../components/PageLoader';

class NotesList extends React.Component {
  state = {
    notes: [],
    noNotes: false,
  };

  componentDidMount = async () => {
    const query = queryString.parse (this.props.queryString);

    const notes = await listNotes (query);
    this.setState (() => ({notes}));

    if (notes.length === 0) {
      this.setState (() => ({noNotes: true}));
    }
  };

  componentDidUpdate = async prevProps => {
    if (this.props.queryString !== prevProps.queryString) {
      this.setState (() => ({notes: []}));
      const parsed = queryString.parse (this.props.queryString);
      const notes = await listNotes (parsed);
      this.setState (() => ({notes, noNotes: false}));

      if (notes.length === 0) {
        this.setState (() => ({noNotes: true}));
      }
    }
  };

  render () {
    return (
      <div>
        {this.state.noNotes
          ? <NoNotes />
          : <div>
              {this.state.notes.length === 0
                ? <PageLoader />
                : <List>
                    {this.state.notes.map (note => (
                      <NoteItem key={note._id} note={note} />
                    ))}
                  </List>}
            </div>}
      </div>
    );
  }
}

export default NotesList;
