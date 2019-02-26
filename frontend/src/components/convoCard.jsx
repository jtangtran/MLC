import React, { Component } from 'react';

class ConvoCard extends Component {

  render() {
    return (
        <div className="card convoCard">
            <div className="card-body">
              <h5 className="card-title">
                {this.props.model ? <a href={"/idea/" + this.props.model.id}>
                  {this.props.model.title}</a> : '...'}{}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Posted by: Chris Eddy</h6>
                <p className="card-text">Description</p>
                <div className="row">
                <div className="col-6">
                    <p className="likeText">134 Likes</p>
                </div>
                <div className="col-6">
                    <p className="dislikeText">134 Dislikes</p>
                </div>
                <div className="col-12">
                    <p>15 Comments</p>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default ConvoCard;





