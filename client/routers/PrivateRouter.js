import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

// import {isAuthenticated} from '../api/auth.api';
import {isAuthenticated} from '../helpers/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

// class PrivateRoute extends React.Component {
//   state = {
//     loggedIn: false,
//     loaded: false,
//   };

//   componentDidMount() {
//     isAuthenticated().then(data => {
//       if (data) {
//         return this.setState(() => ({loggedIn: true, loaded: true}));
//       }

//       this.setState(() => ({loggedIn: false, loaded: true}));
//     });
//   }

//   render() {
//     const {component: Component, ...rest} = this.props;
//     const {loggedIn, loaded} = this.state;

//     if (!loaded) {
//       return null;
//     } else {
//       return (
//         <Route
//           {...rest}
//           render={props =>
//             loggedIn ? <Component {...props} /> : <Redirect to="/login" />
//           }
//         />
//       );
//     }
//   }
// }

export default PrivateRoute;
