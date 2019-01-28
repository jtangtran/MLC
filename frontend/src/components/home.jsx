import React, { Component } from 'react';
import '../stylesheets/home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">My Living City</h1>
                <p class="lead">
                    In order to transform our cities into living cities that exist in complete integrity with the natural world, we need to empower every citizen to engage in a conversation for change and a call to take action in their community.
                </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;