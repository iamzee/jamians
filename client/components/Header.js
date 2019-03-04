import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div>
    <Link to="/">Home Page</Link>
    <Link to="/login">Login Page</Link>
    <Link to="/signup">Signup Page</Link>
    <Link to="/notes/upload">Upload Notes</Link>
  </div>
);

export default Header;
