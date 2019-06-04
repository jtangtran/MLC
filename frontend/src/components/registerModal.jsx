import React, { Component } from 'react';

const API_URL = require('../config.js');

class RegisterModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        fname: '',
        lname: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async register(e){
    e.preventDefault();
    try{
        let data = JSON.stringify({
            user: {
              email: this.state.email,
              password: this.state.password,
              fname: this.state.fname,
              lname: this.state.lname
            }
        });
        let response = await fetch(API_URL+"/user/register", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: data
      });
      if (response.ok){
          console.log('Register Success')
          document.getElementById('submitBtnRegister').hidden = true;
          document.getElementById('confirmIconRegister').hidden = false;
          try{
            let data = JSON.stringify({
              user: {
                email: this.state.email,
                password: this.state.password,
              }
            });
            await fetch(API_URL+"/user/login", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: data
          }).then((response) => {
            if(response.ok){
              response.json().then((data) => {
                console.log('Got User: ', data);
                sessionStorage.setItem('loggedin', true);
                sessionStorage.setItem('user', data.user.email);
                setTimeout(function(){
                  window.location.reload();
                  }, 1500);
              }).catch(e => {
                console.log(e.stack);
                sessionStorage.setItem('loggedin', false);
                sessionStorage.setItem('user', data.user.email);
              });
            }
          });
        }
        catch(e){
            console.log(e.stack);
        }
      }
    }
    catch(e){
        console.log(e.stack);
    }
  }

  render() {
    return (
      <div className="RegisterModal">
        <div className="modal fade" id="registerModal" role="dialog" aria-labelledby="registerModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="registerModalLabel">Register</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body text-center">
                <form onSubmit={this.register}>
                  <div className="form-group">
                    <input onChange={this.handleChange} name="fname" type="text" className="form-control text-center" id="fnameRegisterInput" aria-describedby="firstName" placeholder="First Name" required/>
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleChange} name="lname" type="text" className="form-control text-center" id="lnameRegisterInput" aria-describedby="lastName" placeholder="Last Name" required/>
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleChange} name="email" type="email" className="form-control text-center" id="emailRegisterInput" aria-describedby="emailRegister" placeholder="Enter email" required/>
                  </div>
                  <div className="form-group">
                    <input onChange={this.handleChange} name="password" type="password" className="form-control text-center" id="passwordRegisterInput" placeholder="Password" required/>
                  </div>
                  <div>
                    <button id="submitBtnRegister" type="submit" className="btn btn-primary">Register</button>
                    <i id="confirmIconRegister" hidden className="fas fa-check fa-2x"></i>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterModal;
