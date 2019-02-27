import React, { Component } from 'react';
import '../stylesheets/about.css';

import Navbar from './navbar';

class About extends Component {
  render() {
    return (
      <div className="About">
        <Navbar/>
        <h1 className="pt-3 pl-4 pb-4">About Us</h1>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Chris Eddy</h5>
            <p>Full-stack Web Developer</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Chris Eddy</h5>
            <p>Full-stack Web Developer</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Chris Eddy</h5>
            <p>Full-stack Web Developer</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Chris Eddy</h5>
            <p>Full-stack Web Developer</p>
          </div>
        </div>

        <div className="row pt-4 pl-4 pr-4">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h2>Our Story</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h2>Our Purpose</h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    );
  }
}

export default About;