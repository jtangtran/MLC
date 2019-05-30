import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      value: 'Comment on Idea'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
  }

  

  async componentDidMount() {
    await fetch(API_URL + "/ideas/" + this.props.match.params.id)
      .then(response => response.json())
      .then(json => {
        this.setState({json: json});
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }


  render() {
    return (
      <div className="Idea">
        <Navbar/>
        <h4>{this.state.json.title}</h4>
        <br/>
        <p>{this.state.json.description}</p>
        <b>Place Petal: </b> {this.state.json.place_petal} 
        <br/>
        <b>Water Petal: </b> {this.state.json.water_petal} 
        <br/>
        <b>Energy Petal: </b> {this.state.json.energy_petal} 
        <br/>
        <b>Health Petal: </b> {this.state.json.health_petal} 
        <br/>
        <b>Materials Petal: </b> {this.state.json.materials_petal} 
        <br/>
        <b>Equity Petal: </b> {this.state.json.equity_petal} 
        <br/>
        <b>Beauty Petal: </b> {this.state.json.beauty_petal} 
        <h4>Comment</h4>
        <input type="text" name="comment"></input>
        <input type="submit" value="Submit"></input>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <textarea value={this.state.value} onChange={this.handleChange}></textarea>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    

     
     
    );
  }
}

export default Idea;
