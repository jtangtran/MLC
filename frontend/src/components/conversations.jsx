import React, { Component } from 'react';
import '../stylesheets/conversations.css';

import Navbar from './navbar';

class Conversations extends Component {
  render() {
    return (
      <div className="Conversations">
        <Navbar/>
        <h4>Conversations Page</h4>
      </div>
    );
  }
}

export default Conversations;