import React, { Component } from 'react';

class LoginModal extends Component {
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
                <form>
                  <div className="form-group">
                    <input type="email" className="form-control text-center" id="emailLoginInput" aria-describedby="emailLogin" placeholder="Enter email"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control text-center" id="passwordLoginInput" placeholder="Password"/>
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