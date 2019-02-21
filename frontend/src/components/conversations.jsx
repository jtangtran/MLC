import React, { Component } from 'react';
import '../stylesheets/conversations.css';

import Navbar from './navbar';
import ConvoCard from './convoCard.jsx';

class Conversations extends Component {
  render() {
    return (
      <div className="Conversations">
        <Navbar/>
        <div className="row ml-3 mr-3">
          <div className="col-12 text-center">
            <br/>
            <h2>Ideas Discussions</h2>
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
}

export default Conversations;