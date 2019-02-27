import React, { Component } from 'react';
import '../stylesheets/blogs.css';

class BlogCard extends Component {
  render() {
    return (
      <div className="BlogCard">
        <div className="card">
            <img src="https://via.placeholder.com/500" className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">Blog Title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="/" className="btn btn-primary">Read Blog</a>
            </div>
        </div>
      </div>
    );
  }
}

export default BlogCard;