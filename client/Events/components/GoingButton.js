import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import {isAuthenticated} from '../../helpers/auth';
import {addGoing, removeGoing} from '../../api/event';

class GoingButton extends React.Component {
  state = {
    going: false,
    adding: false,
    removing: false,
  };

  componentDidMount = () => {
    const {event} = this.props;
    const {user} = isAuthenticated();

    const matchedUser = event.going.find(g => g._id === user._id);

    if (matchedUser) {
      this.setState(() => ({going: true}));
    }
  };

  onAddGoing = async () => {
    const {event} = this.props;
    const {token} = isAuthenticated();
    this.setState(() => ({adding: true}));
    await addGoing(event._id, token);
    this.setState(() => ({going: true, adding: false}));
  };

  onRemoveGoing = async () => {
    const {event} = this.props;
    const {token} = isAuthenticated();
    this.setState(() => ({removing: true}));
    await removeGoing(event._id, token);
    this.setState(() => ({going: false, removing: false}));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.going ? (
          <React.Fragment>
            {this.state.removing ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.onRemoveGoing}
              >
                <CheckIcon style={{marginRight: '4px'}} />
                You are going!
              </Button>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.state.adding ? (
              <CircularProgress size={20} />
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.onAddGoing}
              >
                Going ?
              </Button>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default GoingButton;
