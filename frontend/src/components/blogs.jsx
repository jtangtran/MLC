import React, { Component } from 'react';
import '../stylesheets/blogs.css';

import Navbar from './navbar';

class Blogs extends Component {
  render() {
    return (
      <div className="Blogs">
        <Navbar/>
        <h4>Blog Page</h4>
      </div>
    );
  }
}

export default Blogs;