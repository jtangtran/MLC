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
    this.autoScroll = this.autoScroll.bind(this);
  }

  componentDidMount(){
    this.getIdeas();
    this.autoScroll();
  }

  autoScroll(){
    setTimeout(function(){
      const scrollRows = document.getElementsByClassName('convoRow');
      let turnAround = [false, false, false];
      for(let i = 0; i < scrollRows.length; i++){
        setInterval(function(){
          let width = scrollRows[i].scrollWidth / 2;
          if(scrollRows[i].scrollLeft == width){
            turnAround[i] = true;
          }
          if(scrollRows[i].scrollLeft == 20){
            turnAround[i] = false;
          }
          if(turnAround[i]){
            scrollRows[i].scrollLeft -= 1;
          }
          else{
            scrollRows[i].scrollLeft += 1;
          }
          }, 50);
      }
      }, 1000);
  }

  getIdeas(){
    try{
      await fetch(API_URL + "/ideas/0", {
          method: "GET",
          headers: {"Content-Type": "application/json"}
      }).then((response) => {
          response.json().then((data) => {
            console.log('Fetched Ideas: ', data);
            data.forEach(element => {
              element.idea.downvotes = element.downvoteCount;
              element.idea.upvotes = element.upvoteCount;
            });
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
              <div className="convoRow">
                {this.state.ideas.map((value, index) => {
                  return <ConvoCard key={index} model={value}/>
                })}
              </div>
            </div>
          </div>
  
          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Proposals Discussions</h2>
              <div className="convoRow">
                {this.state.ideas.map((value, index) => {
                  return <ConvoCard key={index} model={value}/>
                })}
              </div>
            </div>
          </div>
  
          <div className="row ml-3 mr-3">
            <div className="col-12 text-center">
              <br/>
              <h2>Active Collaborations</h2>
              <div className="convoRow">
                {this.state.ideas.map((value, index) => {
                  return <ConvoCard key={index} model={value}/>
                })}
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
