import React, { Component } from 'react';
import '../stylesheets/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">My Living City</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a className="nav-item nav-link active" href="/">Conversations<span class="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="/">Blogs</a>
                <a className="nav-item nav-link" href="/">About Us</a>
                </div>
            </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
