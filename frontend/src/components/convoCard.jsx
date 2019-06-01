import React, { Component } from 'react';

class ConvoCard extends Component {

  render() {
    return (
        <div className="card convoCard">
            <div className="card-body">
              <h5 className="card-title">
                {this.props.model ? <a href={"/idea/" + this.props.model.idea.id}>
                  {this.props.model.idea.title}</a> : '...'}{}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Posted by: Chris Eddy</h6>
                <p className="card-text">{this.props.model.idea.description}</p>
                <div className="row">
                <div className="col-6">
                    <p className="likeText">{this.props.model.idea.upvotes} Likes</p>
                </div>
                <div className="col-6">
                    <p className="dislikeText">{this.props.model.idea.downvotes} Dislikes</p>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default ConvoCard;





