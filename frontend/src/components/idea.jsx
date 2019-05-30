import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      idea: {}
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
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({json: json});
        this.setState({idea: json.idea});
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }


  render() {
    return (
      <div className="Idea">
        <Navbar/>
        <h4>{this.state.idea.title}</h4>
        <br/>
        <p>{this.state.json.description}</p>
        <b>Place Petal: </b> {this.state.idea.place_petal} 
        <br/>
        <b>Water Petal: </b> {this.state.idea.water_petal} 
        <br/>
        <b>Energy Petal: </b> {this.state.idea.energy_petal} 
        <br/>
        <b>Health Petal: </b> {this.state.idea.health_petal} 
        <br/>
        <b>Materials Petal: </b> {this.state.idea.materials_petal} 
        <br/>
        <b>Equity Petal: </b> {this.state.idea.equity_petal} 
        <br/>
        <b>Beauty Petal: </b> {this.state.idea.beauty_petal} 
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <textarea value={this.state.value} onChange={this.handleChange}></textarea>
          </label>
          <input class="btn btn-primary" type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default Idea;
