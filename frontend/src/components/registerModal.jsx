import React, { Component } from 'react';

class RegisterModal extends Component {
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
                <form>
                  <div className="form-group">
                    <input type="text" className="form-control text-center" id="fnameRegisterInput" aria-describedby="firstName" placeholder="First Name"/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control text-center" id="lnameRegisterInput" aria-describedby="lastName" placeholder="Last Name"/>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control text-center" id="emailRegisterInput" aria-describedby="emailRegister" placeholder="Enter email"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control text-center" id="passwordRegisterInput" placeholder="Password"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control text-center" id="passwordConfirmInput" placeholder="Confirm Password"/>
                  </div>
                  <button type="submit" className="btn btn-primary">Register</button>
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