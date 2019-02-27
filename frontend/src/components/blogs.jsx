import React, { Component } from 'react';
import '../stylesheets/blogs.css';

import Navbar from './navbar';
import BlogCard from './blogCard';

class Blogs extends Component {
  render() {
    return (
      <div className="Blogs">
        <Navbar/>
        <h1 className="pt-3 pl-4">Blogs</h1>
        <div className="row pt-3 pl-4 pr-4">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-2 pb-2">
            <BlogCard/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-2 pb-2">
            <BlogCard/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-2 pb-2">
            <BlogCard/>
          </div>
        </div>
        <br/>
        <div className="row pt-3 pl-4 pr-4">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-2 pb-2">
            <BlogCard/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-2 pb-2">
            <BlogCard/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-2 pb-2">
            <BlogCard/>
          </div>
        </div>
      </div>
    );
  }
}

export default Blogs;