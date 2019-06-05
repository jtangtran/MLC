import React, { Component } from 'react';
import Moment from 'react-moment';

class ConvoCard extends Component {

  render() {
    return (
        <div className="card convoCard">
          <a href={"/idea/" + this.props.model.idea.id}>
            <div className="card-body">
              <h5 className="card-title">
                {this.props.model ? this.props.model.idea.title : '...'}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">Posted by: {this.props.model.idea.User.fname} {this.props.model.idea.User.lname}</h6>
              <p className="card-text">{this.props.model.idea.description.length < 30 ? this.props.model.idea.description: this.props.model.idea.description.slice(0, 30) + '...'}</p>
              <div className="row">
              <div className="col-6">
                  <p className="likeText">{this.props.model.idea.upvotes} Likes</p>
              </div>
              <div className="col-6">
                  <p className="dislikeText">{this.props.model.idea.downvotes} Dislikes</p>
              </div>
              <div className="col-12">
                <Moment format="MMM Do YYYY">{this.props.model.idea.createdAt}</Moment>
              </div>
              </div>
            </div>
            </a>
        </div>
    );
  }
}

export default ConvoCard;





