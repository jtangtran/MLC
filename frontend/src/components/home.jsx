import React, { Component } from 'react';
import '../stylesheets/home.css';

import Navbar from './navbar.jsx';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Navbar/>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">My Living City</h1>
                <p className="lead">
                    In order to transform our cities into living cities that exist in complete integrity with the natural world, we need to empower every citizen to engage in a conversation for change and a call to take action in their community.
                </p>
            </div>
        </div>
        <div className="row">
          <div className="col-8 text-center">
            <h3>New and Trending</h3>
          </div>
          <div className="col-4 text-center">
            <h3>Conversations</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;