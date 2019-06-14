import React, { Component } from 'react';
import Navbar from './navbar';
import Moment from 'react-moment';
import '../stylesheets/idea.css';

const API_URL = require('../config.js')

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      idea: {},
      comments: [],
      user: [],
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
    await fetch(API_URL + "/idea/" + this.props.match.params.id)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({json: json});
        json.idea.createdAt = json.idea.createdAt.slice(0,10)
        this.setState({idea: json.idea});
        this.setState({user: json.idea.User})
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
    const data = JSON.stringify({
      text: this.state.newComment
    })
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/comment', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
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
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/upvote', {
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
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/downvote', {
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
    const shareURL = window.location.href;
    console.log(shareURL)
    return (
      <div className="Idea">
        <Navbar/>
        <div className="row">
          <div className="col-12 text-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{this.state.idea.title}</h1>
                <h5>Posted by: {this.state.user.fname} {this.state.user.lname}</h5>
                <Moment format="MMM Do YYYY">{this.state.idea.createdAt}</Moment>
                <br/>
                <br/>
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
                  <div className="col-12 mt-5">
                    <h5>Share</h5>
                    <a class="resp-sharing-button__link" href={"https://facebook.com/sharer/sharer.php?u=http%3A%2F%2F" + shareURL} target="_blank" rel="noopener" aria-label="">
                      <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.5H14.5V5.6c0-.9.6-1.1 1-1.1h3V.54L14.17.53C10.24.54 9.5 3.48 9.5 5.37V7.5h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                        </div>
                      </div>
                    </a>

                    <a class="resp-sharing-button__link" href={"https://twitter.com/intent/tweet/?" + "text=Check%20out%20this%20idea%20on%20MyLivingCity,%20leave%20a%20comment%20and%20cast%20your%20vote.&amp;url=" + shareURL}target="_blank" rel="noopener" aria-label="">
                      <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z"/></svg>
                        </div>
                      </div>
                    </a>

                    <a class="resp-sharing-button__link" href={"mailto:?subject=Check%20out%20this%20idea%20on%20MyLivingCity,%20leave%20a%20comment%20and%20cast%20your%20vote.&amp;" + "body=http%3A%2F%2F" + shareURL} target="_self" rel="noopener" aria-label="">
                      <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14"/></svg>
                        </div>
                      </div>
                    </a>

                    <a class="resp-sharing-button__link"  href={"https://reddit.com/submit/?url=http%3A%2F%2F" + shareURL + "&amp;resubmit=true&amp;title=Check%20out%20this%20idea%20on%20MyLivingCity,%20leave%20a%20comment%20and%20cast%20your%20vote."}target="_blank" rel="noopener" aria-label="">
                      <div class="resp-sharing-button resp-sharing-button--reddit resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><ellipse cx="12" cy="15" rx="9.5" ry="6.5"/><path d="M15.54 17.88c-.96.55-2.2.88-3.54.88-1.35 0-2.6-.33-3.55-.9"/><circle cx="16" cy="13.5" r="1.5"/><circle cx="8" cy="13.5" r="1.5"/><path d="M18.74 10.42C19.14 9.58 20 9 21 9c1.38 0 2.5 1.12 2.5 2.5 0 1.25-.92 2.3-2.12 2.47"/><circle cx="20" cy="4.5" r="2.5"/><path d="M5.26 10.42C4.86 9.58 4 9 3 9 1.62 9 .5 10.12.5 11.5c0 1.25.92 2.3 2.12 2.47M12 8.5s-.13-7.4 5.5-4"/></svg>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                <div className="col-6 text-center">
                  <p>Place Petal:</p>
                  <span className="badge badge-pill badge-primary p-2">{this.state.idea.place_petal}</span>
                  </div>
                  <div className="col-6 text-center">
                    <p>Beauty Petal:</p> 
                    <span className="badge badge-pill badge-primary p-2">{this.state.idea.beauty_petal}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-6 text-center">
                    <p>Energy Petal:</p> 
                    <span className="badge badge-pill badge-primary p-2">{this.state.idea.energy_petal}</span>
                  </div>
                  <div className="col-6 text-center">
                    <p>Health Petal:</p> 
                    <span className="badge badge-pill badge-primary p-2">{this.state.idea.health_petal}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-6 text-center">
                    <p>Materials Petal:</p> 
                    <span className="badge badge-pill badge-primary p-2">{this.state.idea.materials_petal}</span>
                  </div>
                  <div className="col-6 text-center">
                    <p>Equity Petal:</p> 
                    <span className="badge badge-pill badge-primary p-2">{this.state.idea.equity_petal}</span>
                  </div>
                </div>
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
