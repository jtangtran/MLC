import React, { Component } from 'react';

const API_URL = require('../config.js');

class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.rejectLogin = this.rejectLogin.bind(this);
    this.acceptLogin = this.acceptLogin.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async login(e){
    e.preventDefault();
    try{
    let data = JSON.stringify({
        email: this.state.email,
        password: this.state.password,
    });

    let response = await fetch(API_URL+"/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: data
    });
    if (response.ok){
        console.log('Login sent')
    }
    }
    catch(e){
        console.log(e.stack);
    }
  }

  rejectLogin(){

  }

  acceptLogin(){

  }


  render() {
    return (
      <div className="LoginModal">
        <div className="modal fade" id="loginModal" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="loginModalLabel">Login</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body text-center">
                <form onSubmit={this.login}>
                  <div className="form-group">
                    <input onChange={this.onChange} type="email" name="email" className="form-control text-center" id="emailLoginInput" aria-describedby="emailLogin" placeholder="Enter email"/>
                  </div>
                  <div className="form-group">
                    <input onChange={this.onChange} type="password" name="password" className="form-control text-center" id="passwordLoginInput" placeholder="Password"/>
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;