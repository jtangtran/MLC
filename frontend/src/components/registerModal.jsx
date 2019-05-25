import React, { Component } from 'react';

const API_URL = require('../config.js');

class RegisterModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        passwordConfirm: '',
        fname: '',
        lname: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
    this.rejectRegister = this.rejectRegister.bind(this);
    this.acceptRegister = this.acceptRegister.bind(this);
  }

  componentDidMount(){
    document.getElementById('confirmIcon').hidden = true;
    document.getElementById('denyIcon').hidden = true;
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async register(e){
    e.preventDefault();
    if(this.state.password === this.state.passwordConfirm){
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
            this.acceptRegister();
        }
        else{
          this.rejectRegister();
        }
      }
      catch(e){
          console.log(e.stack);
          this.rejectRegister();
      }
    }
    else{
      this.rejectRegister();
    }
  }

  rejectRegister(){
    document.getElementById('submitBtn').hidden = false;
    document.getElementById('confirmIcon').hidden = true;
    document.getElementById('denyIcon').hidden = false;
  }

  acceptRegister(){
    document.getElementById('submitBtn').hidden = true;
    document.getElementById('confirmIcon').hidden = false;
    document.getElementById('denyIcon').hidden = true;
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
                  <div className="form-group">
                    <input onChange={this.handleChange} name="passwordConfirm" type="password" className="form-control text-center" id="passwordConfirmInput" placeholder="Confirm Password" required/>
                  </div>
                  <div id="statusContainer">
                    <button id="submitBtn" type="submit" className="btn btn-primary">Register</button>
                    <div>
                      <i id="confirmIcon" className="fas fa-check fa-2x"></i>
                      <i id="denyIcon" className="far fa-times-circle fa-2x"></i>
                    </div>
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
