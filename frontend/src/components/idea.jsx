import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      idea: {},
      comments: [],
      newComment: ""
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addLike = this.addLike.bind(this);
    this.addDislike = this.addDislike.bind(this);
  }

  handleCommentChange(event){
    this.setState({newComment: event.target.value});
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

    await fetch(API_URL + "/idea/" + this.props.match.params.id + '/comments')
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({comments: json});
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  addComment(e){
    e.preventDefault();
    const data = {
      text: this.state.newComment
    }
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/comment', {
      method: "POST",
      body: data
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  }

  addLike(e){
    e.preventDefault();
    fetch(API_URL + "/ideas/" + this.props.match.params.id + '/upvote', {
      method: "POST",
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  }

  addDislike(e){
    e.preventDefault();
    fetch(API_URL + "/ideas/" + this.props.match.params.id + '/downvote', {
      method: "POST"
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  }

  render() {
    return (
      <div className="Idea">
        <Navbar/>
        <div className="row">
          <div className="col-12 text-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{this.state.idea.title}</h1>
                <p className="lead">{this.state.idea.description}</p>
                <div className="row">
                  <div className="col-6">
                    <p className="lead">Likes</p>
                    <h3 style={{"color": "green"}}>{this.state.json.upvoteCount}</h3>
                    <br/>
                    <button onClick={(e) => this.addLike(e)} type="button" className="btn btn-light">
                      Like<span className="pl-2"></span>
                      <span className="badge badge-success">
                        <i className="far fa-thumbs-up"></i>
                      </span>
                    </button>
                  </div>
                  <div className="col-6">
                    <p className="lead">Dislikes</p>
                    <h3 style={{"color": "red"}}>{this.state.json.downvoteCount}</h3>
                    <br/>
                    <button onClick={(e) => this.addDislike(e)} type="button" className="btn btn-light">
                      Dislike<span className="pl-2"></span>
                      <span className="badge badge-danger">
                        <i className="far fa-thumbs-down"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-2 text-center">
                <p>Place Petal:</p>
                <span className="badge badge-pill badge-primary p-2">{this.state.idea.place_petal}</span>
              </div>
              <div className="col-2 text-center">
                <p>Beauty Petal:</p> 
                <span className="badge badge-pill badge-primary p-2">{this.state.idea.beauty_petal}</span>
              </div>
              <div className="col-2 text-center">
                <p>Energy Petal:</p> 
                <span className="badge badge-pill badge-primary p-2">{this.state.idea.energy_petal}</span>
              </div>
              <div className="col-2 text-center">
                <p>Health Petal:</p> 
                <span className="badge badge-pill badge-primary p-2">{this.state.idea.health_petal}</span>
              </div>
              <div className="col-2 text-center">
                <p>Materials Petal:</p> 
                <span className="badge badge-pill badge-primary p-2">{this.state.idea.materials_petal}</span>
              </div>
              <div className="col-2 text-center">
                <p>Equity Petal:</p> 
                <span className="badge badge-pill badge-primary p-2">{this.state.idea.equity_petal}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <br/>
          <div className="row">
            <div className="col-6">
              <h3>Add Comment</h3>
              <form className="text-center" onSubmit={(e) => this.addComment(e)}>
                <div className="input-group">
                  <textarea className="form-control" placeholder="Type your comment here" value={this.state.newComment} onChange={this.handleCommentChange}></textarea>
                </div>
                <br/>
                <input className="btn btn-primary" type="submit" value="Post Comment"></input>
              </form>
            </div>
            <div className="col-6">
              <h3>Comments</h3>
              <ul className="list-group">
                {this.state.comments.map((value, index) => {
                  return <li className="list-group-item" key={index}>{value.text}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Idea;
