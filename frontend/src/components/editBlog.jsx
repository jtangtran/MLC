import React, { Component } from 'react';
import '../stylesheets/blogs.css';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Navbar from './navbar';
const API_URL = require('../config.js')


class EditBlog extends Component {
    constructor (props) {
        super(props);
        this.state = {
          value: "",
          tab: "write" | "preview"
        };
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true,
          strikethrough: true,
          tasklists: true
        });
        this.addBlog = this.addBlog.bind(this);
    }

    handleValueChange = (value) => {
        this.setState({ value });
    };

    handleTabChange = (tab) => {
      this.setState({tab})
    };

    addBlog(){
      const data = JSON.stringify({
        title: "blog",
        markdown: this.state.value
      })
      fetch(API_URL + "/blog", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
      })
    }
    
  render() {
    return (
      <div className="EditBlog">
        <Navbar/>
        <div className="row">
          <div className="col-6">
            <h1 className="pt-3 pl-4">Edit Blog</h1>
          </div>
          <div className="col-6">
            <button onClick={this.addBlog} type="button" className="btn btn-warning float-right mt-3 mr-4">Save Blog</button>
          </div>
        </div>
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          selectedTab={this.state.tab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
      </div>
    );
  }
}

export default EditBlog;
