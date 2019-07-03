import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';

import {listNotes} from '../../api/notes';
import {isAuthenticated} from '../../helpers/auth';
import NoNotes from './NoNotes';
import Loader from '../../components/Loader';
import NoteItem from './NoteItem';

class NotesList extends React.Component {
  state = {
    notes: [],
    noNotes: false,
  };

  componentDidMount = async () => {
    const {token} = isAuthenticated();
    const query = queryString.parse(this.props.queryString);

    const notes = await listNotes(query, token);
    this.setState(() => ({notes}));

    if (notes.length === 0) {
      this.setState(() => ({noNotes: true}));
    }
  };

  componentDidUpdate = async prevProps => {
    const {token} = isAuthenticated();
    if (this.props.queryString !== prevProps.queryString) {
      this.setState(() => ({notes: []}));
      const parsed = queryString.parse(this.props.queryString);
      const notes = await listNotes(parsed, token);
      this.setState(() => ({notes, noNotes: false}));

      if (notes.length === 0) {
        this.setState(() => ({noNotes: true}));
      }
    }
  };

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
