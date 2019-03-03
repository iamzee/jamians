import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div>
    <Link to="/">Home Page</Link>
    <Link to="/login">Login Page</Link>
  </div>
);

export default Header;
