import React from 'react';

import UserForm from '../components/UserForm';
import {createUser} from '../../api/user';

class CreateUser extends React.Component {
  onSubmit = async (user, cb) => {
    await createUser(user);
    cb();
    this.props.history.push('/login?new=true');
  };

  render() {
    return (
      <div>
        <UserForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default CreateUser;
