import React, { Component } from 'react';
import '../stylesheets/blogs.css';
import Navbar from './navbar';

const ReactMarkdown = require('react-markdown')
const API_URL = require('../config.js')


class ViewBlog extends Component {
    constructor (props) {
        super(props);
        this.state = {
          blog: ''
        };
    }
    
    async componentDidMount() {
        await fetch(API_URL + "/blog/" + this.props.match.params.id)
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.setState({blog: json});
          })
          .catch(error => {
            console.log("Error: " + error);
          });
    }

  render() {
    return (
      <div className="ViewBlog">
        <Navbar/>
        <div className="row">
            <div className="col-12 text-center">
                <br/>
                <h1>{this.state.blog.title}</h1>
                <div className="text-left p-5">
                    <ReactMarkdown source={this.state.blog.markdown}/>
                </div>
                
            </div>
        </div>
      </div>
    );
  }
}

export default ViewBlog;