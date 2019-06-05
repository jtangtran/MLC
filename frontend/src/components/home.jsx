import React, { Component } from 'react';
import '../stylesheets/home.css';

import Navbar from './navbar.jsx';
const API_URL = require('../config.js')


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ideas: []
    };
    this.getIdeas = this.getIdeas.bind(this);
  }

  componentDidMount(){
    this.getIdeas();
  }

  async getIdeas(){
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
        });
      });
    }
    catch(e){
        console.log(e.stack);
    }
  }

  render() {
    return (
      <div className="Home">
        <Navbar/>
        <div className="jumbotron jumbotron-fluid" id="banner">
            <div className="container">
                <h1 className="display-4">My Living City</h1>
                <p className="lead">
                    In order to transform our cities into living cities that exist in complete integrity with the natural world, we need to empower every citizen to engage in a conversation for change and a call to take action in their community.
                </p>
            </div>
        </div>
        <div className="row">
          <div className="col-8 text-center pr-0">
            <h3>New and Trending</h3>
            <div className="bd-example">
              <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  {this.state.ideas.map((value, index) => {
                    return <li key={index} data-target="#carouselExampleCaptions" data-slide-to={index} className="active"></li>
                  })}
                </ol>
                <div className="carousel-inner">
                  {this.state.ideas.map((value, index) => {
                    return  <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                              <img src="https://cdn-images-1.medium.com/max/1600/1*14cEm2ezAJs_nPgjsVJHZg.jpeg" className="d-block w-100" alt="..."/>
                              <div className="carousel-caption d-none d-md-block">
                                <h5>{value.idea.title}</h5>
                                <p>{value.idea.description}</p>
                                <a href={"/idea/" + value.idea.id}><button type="button" class="btn btn-primary">View</button></a>
                              </div>
                            </div>
                  })}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-4 text-center pl-0">
            <h3>Conversations</h3>
            <div className="list-group">
                {this.state.ideas.map((value, index) => {
                  return <a href={"/idea/" + value.idea.id} key={index} className="convoList">
                          <button type="button" className="list-group-item list-group-item-action">
                            {value.idea.title}
                          </button>
                        </a>
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;