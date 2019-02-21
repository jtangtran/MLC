import React, { Component } from 'react';
import '../stylesheets/about.css';

import Navbar from './navbar';

class About extends Component {
  render() {
    return (
      <div className="About">
        <Navbar/>
        <h4>About Page</h4>
      </div>
    );
  }
}

export default About;