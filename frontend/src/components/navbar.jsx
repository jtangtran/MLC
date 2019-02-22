import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../stylesheets/navbar.css';

import SignInModal from './loginModal.jsx';
import SignUpModal from './registerModal.jsx';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">My Living City</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/conversations" className="nav-item nav-link">Conversations</Link>
              <Link to="/blogs" className="nav-item nav-link">Blogs</Link>
              <Link to="/about" className="nav-item nav-link">About Us</Link>
              <Link to="/submit" className="nav-item nav-link">Submit Idea</Link>
            </div>
          </div>
          <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#loginModal">Login</button>
          <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#registerModal">Register</button>
        </nav>
        <SignInModal/>
        <SignUpModal/>
      </div>
    );
  }
}

export default Navbar;
