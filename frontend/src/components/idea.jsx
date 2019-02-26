import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {}
    };
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
      </div>
    );
  }
}

export default Idea;
