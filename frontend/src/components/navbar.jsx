import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../stylesheets/navbar.css';

import SignInModal from './loginModal.jsx';
import SignUpModal from './registerModal.jsx';

const API_URL = require('../config.js')

class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    const loginButtons = document.getElementById('loginButtons');
    const loggedIn = document.getElementById('loggedIn');
    let userLoggedIn = sessionStorage.getItem('loggedin');
    let user = sessionStorage.getItem('user');
    this.setState({user: user});
    if(userLoggedIn){
      loginButtons.hidden = true;
      loggedIn.hidden = false;
    }
    else{
      loginButtons.hidden = false;
      loggedIn.hidden = true;
    }
  }

  logout(){
    try{
        fetch(API_URL+"/user/logout", {
          method: "POST",
      }).then((response) => {
        if(response.ok){
            console.log('Logged Out User');
            sessionStorage.setItem('loggedIn', false);
            sessionStorage.setItem('user', null);
            window.location.reload();
        }
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

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
              <Link to="/submit" className="nav-item nav-link">Submit Idea</Link>
            </div>
          </div>
          <div id="loginButtons">
            <button type="button" className="btn btn-primary mr-2" data-toggle="modal" data-target="#loginModal">Login</button>
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#registerModal">Register</button>
          </div>
          <div id="loggedIn">
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.user}
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <div style={{"cursor": "pointer"}}className="dropdown-item" onClick={() => this.logout()}>Logout</div>
              </div>
            </div>
          </div>
        </nav>
        <SignInModal/>
        <SignUpModal/>
      </div>
    );
  }
}

export default Navbar;
