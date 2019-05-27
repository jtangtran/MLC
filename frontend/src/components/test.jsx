import React, { Component } from 'react';

const API_URL = require('../config.js')

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: ""
    };
  }

  async componentDidMount() {
      await fetch(API_URL + "/user/me/")
      .then(response => response.text())
      .then(apiResponse => {
        this.setState({apiResponse: apiResponse});
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }


  render() {
    return (
      <div className="Test">
          {this.state.apiResponse} 
      </div>
    );
  }
}

export default Test;
