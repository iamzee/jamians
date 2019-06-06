import React from 'react';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

class Search extends React.Component {
  state = {
    searchText: '',
  };

  onTextChange = e => {
    const searchText = e.target.value;
    this.setState(() => ({searchText}));
  };

  handleSearch = () => {
    this.props.history.push(`/notes?search=${this.state.searchText}`);
  };

  render() {
    return (
      <div>
        <TextField
          variant="outlined"
          value={this.state.searchText}
          onChange={this.onTextChange}
        />
        <IconButton onClick={this.handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
    );
  }
}
export default Search;
