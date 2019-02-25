import React, { Component } from 'react';
import '../stylesheets/conversations.css';

import Navbar from './navbar';
import ConvoCard from './convoCard.jsx';

const API_URL = require('../config.js');

class Conversations extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ideas: [],
        loading: true
    };
    this.getIdeas = this.getIdeas.bind(this);
  }

  componentDidMount(){
    this.getIdeas();
  }

  async getIdeas(){
    try{
      await fetch(API_URL + "/ideas", {
          method: "GET",
      //    headers: {"Content-Type": "application/json"}
      }).then((response) => {
          response.json().then((data) => {
            console.log('Fetched Ideas: ', data);
            this.setState({ideas: data})
            this.setState({loading: false})
        });
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

  render() {
    if(!this.state.loading){
      return (
        <div className="Conversations">
          <Navbar/>
          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Ideas Discussions</h2>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard model={this.state.ideas[0]}/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard model={this.state.ideas[1]}/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard model={this.state.ideas[2]}/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard model={this.state.ideas[3]}/>
                </div>
              </div>
            </div>
          </div>
  
          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Proposals Discussions</h2>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
              </div>
            </div>
          </div>
  
          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Active Collaborations</h2>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <ConvoCard/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <div>
          <Navbar/>
        </div>
      );
    }
  }
}

export default Conversations;
