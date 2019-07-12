import React from 'react';

import {readMe, updateMe} from '../../api/user';
import UserForm from '../components/UserForm';

class EditMe extends React.Component {
  state = {
    me: null,
  };

  componentDidMount = async () => {
    const me = await readMe();
    this.setState(() => ({me}));
  };

  onSubmit = async (payload, cb) => {
    delete payload.password;
    const user = await updateMe(payload);
    cb();
  };

  render() {
    return (
      <div>
        {this.state.me && (
          <UserForm me={this.state.me} onSubmit={this.onSubmit} />
        )}
      </div>
    );
  }
}

export default EditMe;
