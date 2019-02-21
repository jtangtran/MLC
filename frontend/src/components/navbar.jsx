import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../stylesheets/navbar.css';

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
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
