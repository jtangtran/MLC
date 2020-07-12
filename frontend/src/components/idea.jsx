import React, { Component } from 'react';
import Navbar from './navbar';
import Moment from 'react-moment';
import Ratings from 'react-ratings-declarative';
import BarChart from 'react-bar-chart';
import ReactDOM from 'react-dom';
import '../stylesheets/idea.css';

//sponsor button not needed only the champion button sponsor button is needed for the proposals 
// import SponsorModal from './sponsorModal.jsx';
import ChampionModal from './championModal.jsx';

const API_URL = require('../config.js')

//specifying the width for the bar chart
const width = 400;

//specifying the margin of the bar graphs
const margin = { top: 10, right: 5, bottom: 30, left: 5 };

//specifying the height for the bar chart
const height = 200;

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      idea: {},
      comments: [],
      user: [],
      newComment: "",
      posAvgRating: 0,
      negAvgRating: 0,
      averageRating: 0,
      votes: [],
      interactivity: 0,
      posRating: 0,
      negRating: 0,
      rating: 0
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addLike = this.addLike.bind(this);
    this.addDislike = this.addDislike.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.addRating = this.addRating.bind(this);
  }

  handleCommentChange(event) {
    this.setState({ newComment: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  async componentDidMount() {
    await fetch(API_URL + "/idea/" + this.props.match.params.id)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({ json: json });
        json.idea.createdAt = json.idea.createdAt.slice(0, 10)
        this.setState({ idea: json.idea });
        this.setState({ user: json.idea.User })
        this.setState({ averageRating: Math.abs(parseFloat(json.rating.totalAverage)) || 0 })
        this.setState({ posAvgRating: Math.abs(parseFloat(json.rating.positiveAverage)) || 0})
        this.setState({ negAvgRating: Math.abs(parseFloat(json.rating.negativeAverage)) || 0})
        this.setState({ votes: json.rating.votes})
        this.setState({ interactivity: json.rating.interactivity})
      })
      .catch(error => {
        console.log("Error: " + error);
      });

    await fetch(API_URL + "/idea/" + this.props.match.params.id + '/comments')
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ comments: json });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  addComment(e) {
    e.preventDefault();
    const data = JSON.stringify({
      text: this.state.newComment
    })
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/comment', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data
    })
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  addLike(e) {
    e.preventDefault();
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/upvote', {
      method: "POST",
    })
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  addDislike(e) {
    e.preventDefault();
    fetch(API_URL + "/idea/" + this.props.match.params.id + '/downvote', {
      method: "POST"
    })
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  commentLike(e, id) {
    e.preventDefault();
    fetch(API_URL + "/comment/" + this.props.match.params.id + '/upvote', {
      method: "POST",
    })
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  commentDislike(e, id) {
    e.preventDefault();
    fetch(API_URL + "/comment/" + this.props.match.params.id + '/downvote', {
      method: "POST"
    })
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  addRating(e) {
    e.preventDefault();
    var data = 0;
    if (this.state.rating > 0 && this.state.rating <= 10) {
      //checks if the rating is the negative rating
      if (this.state.rating > 0 && this.state.rating < 5) {
         data = JSON.stringify({
          rating: this.state.rating
        })
      }
            //checks if the rating is the positive rating
      else if (this.state.rating < 10 && this.state.rating >= 5) {
          data = JSON.stringify({
          rating: this.state.rating
        })
      }

      fetch(API_URL + "/idea/" + this.props.match.params.id + '/rate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data
      })
        .then(res => {
          window.location.reload();
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    } else {
      console.log("Must provide a valid rating");
    }
  }

  changeRating(newRating) {
    this.setState({ rating: newRating });
  }

  confirmSponsor(e) {
    //update the sponsor using post but doesn't have a row in the idea db about status 
    alert('are you sure');
  }

  render() {
    var avgRating = this.state.averageRating;
    const shareURL = window.location.href;
    console.log(shareURL)
    //WILL CHANGE SOON TO THE STAR RATING DATA
    //data from the positive likes and dislikes in the comments
    /*
    const data = [
      { text: 'Likes', value: this.state.json.upvoteCount },
      { text: 'Dislikes', value: this.state.json.downvoteCount }
    ];
    */
    // will only display the sponsor button if the average rating is over 3
    if (avgRating > 3.0) {
      //warning just to change the colour of the button to yellow - will change to a different colour soon
      //when the user presses the button it displays a new window similar to sponsorship modal - WILL UPDATE SOON
      const buttonEnabled = <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#championModal">Champion</button>
      document.getElementById('button').disabled = false;
      ReactDOM.render(buttonEnabled, document.getElementById('button'));
    }
    return (
      <div className="Idea">
        <Navbar />
        <div className="row">
          <div className="col-12">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h6 className="card-subtitle">Category: {this.state.idea.category} </h6>
                <h1 className="display-4">{this.state.idea.title}</h1>
                <h5>Posted by: {this.state.user.fname} {this.state.user.lname}</h5>
                <Moment format="L">{this.state.idea.createdAt}</Moment>
                <br />
                <br />
                <p className="lead">{this.state.idea.description}</p>
                <div id="impactAreaGroup">
                  <div className="col-12">
                    <p>Community and Place:
                    <span className="impactAreas">{this.state.idea.community_impact}</span></p>
                  </div>
                  <div className="col-12">
                    <p>Nature and Food Security:
                      <span className="impactAreas">{this.state.idea.nature_impact}</span>
                    </p>
                  </div>
                  <div className="col-12">
                    <p>Arts, Culture, and Education:
                      <span className="impactAreas">{this.state.idea.arts_impact}</span></p>
                  </div>
                  <div className="col-12">
                    <p>Water and Energy:
                      <span className="impactAreas">{this.state.idea.energy_impact}</span></p>
                  </div>
                  <div className="col-12">
                    <p>Manufacturing and Waste:
                      <span className="impactAreas">{this.state.idea.manufacturing_impact}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-5">
                    <div id="button"></div>
                    <br />
                    <h5>Share</h5>
                    <a className="resp-sharing-button__link" href={"https://facebook.com/sharer/sharer.php?u=http%3A%2F%2F" + shareURL} target="_blank" rel="noopener noreferrer" aria-label="">
                      <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.5H14.5V5.6c0-.9.6-1.1 1-1.1h3V.54L14.17.53C10.24.54 9.5 3.48 9.5 5.37V7.5h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
                      </div>
                      </div>
                    </a>

                    <a className="resp-sharing-button__link" href={"https://twitter.com/intent/tweet/?text=Check%20out%20this%20idea%20on%20MyLivingCity,%20leave%20a%20comment%20and%20cast%20your%20vote.&amp;url=" + shareURL} target="_blank" rel="noopener noreferrer" aria-label="">
                      <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z" /></svg>
                      </div>
                      </div>
                    </a>

                    <a className="resp-sharing-button__link" href={"mailto:?subject=Check%20out%20this%20idea%20on%20MyLivingCity,%20leave%20a%20comment%20and%20cast%20your%20vote.&amp;body=http%3A%2F%2F" + shareURL} target="_self" rel="noopener noreferrer" aria-label="">
                      <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14" /></svg>
                      </div>
                      </div>
                    </a>

                    <a className="resp-sharing-button__link" href={"https://reddit.com/submit/?url=http%3A%2F%2F" + shareURL + "&amp;resubmit=true&amp;title=Check%20out%20this%20idea%20on%20MyLivingCity,%20leave%20a%20comment%20and%20cast%20your%20vote."} target="_blank" rel="noopener noreferrer" aria-label="">
                      <div className="resp-sharing-button resp-sharing-button--reddit resp-sharing-button--small"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><ellipse cx="12" cy="15" rx="9.5" ry="6.5" /><path d="M15.54 17.88c-.96.55-2.2.88-3.54.88-1.35 0-2.6-.33-3.55-.9" /><circle cx="16" cy="13.5" r="1.5" /><circle cx="8" cy="13.5" r="1.5" /><path d="M18.74 10.42C19.14 9.58 20 9 21 9c1.38 0 2.5 1.12 2.5 2.5 0 1.25-.92 2.3-2.12 2.47" /><circle cx="20" cy="4.5" r="2.5" /><path d="M5.26 10.42C4.86 9.58 4 9 3 9 1.62 9 .5 10.12.5 11.5c0 1.25.92 2.3 2.12 2.47M12 8.5s-.13-7.4 5.5-4" /></svg>
                      </div>
                      </div>
                    </a>
                  </div>
                </div> {/* end of div className="row" */}
              </div>
            </div>
          </div> {/* end of jumbotron */}

        </div> {/* end of the first div className="row" */}

        {/*Community Rating Row */}
        <div className="container">
          <br />
        <div className="d-flex justify-content-center">
              <h3>Community Rating:</h3>
            </div>
          <div className="row">
            
            <div className="col-md">
              <div id="ratingText">
                Positive Rating:
              </div>
              <Ratings
                rating={Math.abs(this.state.posAvgRating)}
                widgetRatedColors="green"
                widgetEmptyColors="grey"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </div>
            
            <div className="col-md">
              <div id="ratingText">
                Negative Rating:
              </div>
              <Ratings
                rating={this.state.negAvgRating}
                widgetRatedColors="red"
                widgetEmptyColors="grey"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </div>

            <div className="col-md">
              Average Rating: {this.state.averageRating}
              <br />
              {this.state.interactivity} Users have Voted 
            </div>
            <br />
          </div>
          <div className="row">
            <div className="col-md">
              <p>Rating: 1 &nbsp; Count: {this.state.votes["1"]}</p>
              <p>Rating: 2 &nbsp; Count: {this.state.votes["2"]}</p>
              <p>Rating: 3 &nbsp; Count: {this.state.votes["3"]}</p>
              <p>Rating: 4 &nbsp; Count: {this.state.votes["4"]}</p>
              <p>Rating: 5 &nbsp; Count: {this.state.votes["5"]}</p>
            </div>
            <div className="col-md">
              <p>Rating: -1 &nbsp; Count: {this.state.votes["-1"]}</p>
              <p>Rating: -2 &nbsp; Count: {this.state.votes["-2"]}</p>
              <p>Rating: -3 &nbsp; Count: {this.state.votes["-3"]}</p>
              <p>Rating: -4 &nbsp; Count: {this.state.votes["-4"]}</p>
              <p>Rating: -5 &nbsp; Count: {this.state.votes["-5"]}</p>
            </div>
          </div>
        </div>
        <br />

        {/*User Rating for the idea*/}
        <div className="row">
          <div className="col-12">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <div className="d-flex justify-content-center">
                  <h3>Submit Your Rating:</h3>
                </div>
                <div className="d-flex justify-content-center">
                  <Ratings
                    rating={this.state.rating > 6 ? this.state.posRating : this.state.negRating}
                    changeRating={this.changeRating}
                    widgetRatedColors={this.state.rating > 6 ? "lightgreen" : "red"}
                    widgetEmptyColors="grey"
                    widgetHoverColors="yellow"
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                </div>
                <div className="d-flex justify-content-center">
                  <button onClick={(e) => this.addRating(e)} type="button" className="btn btn-light">Submit Rating</button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <br />
        {/* COMMENT PORTION OF THE IDEA */}
        <div className="col-12">
          <br />
          <div className="row">
            <div className="CommetModal">
              <div className="modal fade" id='commentModal' role="dialog" aria-labelledby="commentModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Top Five Comments!</h4>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                      <ul className="list-group">
                        {this.state.comments.map((value, index) => {
                          if (index < 5) {
                            return <li className="list-group-item" key={index}> {value.comment.text}
                              <p className="lead">Likes: {value.upvoteCount}
                                <button onClick={(e) => this.commentLike(e, value.comment.id)} type="button" className="btn btn-light">
                                  Like<span className="pl-2"></span>
                                  <span className="badge badge-success">
                                    <i className="far fa-thumbs-up"></i>
                                  </span>
                                </button>
                              </p>
                              <p className="lead">Dislikes: {value.downvoteCount}
                                <button onClick={(e) => this.commentDislike(e, value.comment.id)} type="button" className="btn btn-light">
                                  Dislike<span className="pl-2"></span>
                                  <span className="badge badge-danger">
                                    <i className="far fa-thumbs-down"></i>
                                  </span>
                                </button>
                              </p>
                              <Moment fromNow className='time'>{value.comment.createdAt}</Moment>
                            </li>
                          }
                        })}
                      </ul>
                    </div>
                    <div className="modal-footer">
                      <div className="col-12">
                        <h5>Comment your Thoughts!</h5>
                        <form className="text-center" onSubmit={(e) => this.addComment(e)}>
                          <div className="input-group">
                            <textarea className="form-control" placeholder="Enter your comment here..." value={this.state.newComment} onChange={this.handleCommentChange}></textarea>
                          </div>
                          <br />
                          <input className="btn btn-primary" type="submit" value="Post Comment"></input>
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <ul className="list-group">
                {this.state.comments.map((value, index) => {
                  var data = [];
                  for (let rating in value.votes) {
                    data.push({ text: rating, value: value.votes[rating]});
                  }
                  return <li className="list-group-item" key={index}>
                    <h5>Posted by: {value.comment.User.fname} {value.comment.User.lname}</h5>
                    <p>{value.comment.text}</p>
                    <p className="lead">Likes: {value.upvoteCount}
                      <button onClick={(e) => this.commentLike(e, value.comment.id)} type="button" className="btn btn-light">
                        Like<span className="pl-2"></span>
                        <span className="badge badge-success">
                          <i className="far fa-thumbs-up"></i>
                        </span>
                      </button>
                    </p>
                    <p className="lead">Dislikes: {value.downvoteCount}
                      <button onClick={(e) => this.commentDislike(e, value.comment.id)} type="button" className="btn btn-light">
                        Dislike<span className="pl-2"></span>
                        <span className="badge badge-danger">
                          <i className="far fa-thumbs-down"></i>
                        </span>
                      </button>
                    </p>
                    <Moment fromNow className='time'>{value.comment.createdAt}</Moment>
                    <BarChart
                      width={width}
                      height={height}
                      margin={margin}
                      data={data} />
                  </li>
                })}
              </ul>
            </div>
            <div className="col-6">
              <button id='commentModal' type="button" className="btn btn-secondary" data-toggle="modal" data-target="#commentModal">Add Comment</button>
            </div>
          </div>
        </div>
        {/* <SponsorModal/> */}
        <ChampionModal />
      </div>
    );
  }
}

export default Idea;
