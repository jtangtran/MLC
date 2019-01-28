import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dbtest: 'press the button to test DB'
    };
    this.testDB = this.testDB.bind(this);
  }

  async testDB(e){
    e.preventDefault();
    let response = await fetch("http://localhost:3000/dbtest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(response.ok){
      this.state.dbtest = response.body;
    }
    else{
      this.state.dbtest = 'failed fetch to DB'
      console.log(response);
    }
  }


  render() {
    return (
      <div className="App">
        <div className="row text-center">
          <div className="col-12">
            <h1>My Living City</h1>
            <button onClick={this.testDB}>Test the DB</button>
            <div>{this.state.dbtest}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
