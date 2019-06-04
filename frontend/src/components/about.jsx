import React, { Component } from 'react';
import '../stylesheets/about.css';

import Navbar from './navbar';

class About extends Component {
  render() {
    return (
      <div className="About">
        <Navbar/>
        <h1 className="pt-3 pl-4 pb-4">About Us</h1>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://avatars1.githubusercontent.com/u/27584221?s=460&v=4" alt="..."/>
            <h5>Chris Eddy</h5>
            <p>Full-stack Web Developer</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://avatars1.githubusercontent.com/u/1562711?s=460&v=4" alt="..."/>
            <h5>Paul Sajna</h5>
            <p>Backend Developer / Dev-Ops</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Chelsea Birch</h5>
            <p>Business Anaylst</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-center pt-3 pb-3">
            <img className="teamImg" src="https://via.placeholder.com/200" alt="..."/>
            <h5>Sonny Brar</h5>
            <p>Sponsor</p>
          </div>
        </div>

        <div className="row pt-4 pl-4 pr-4">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h2>Our Story</h2>
            <p>
              My Living City is a federally and BC registered non-profit.  We are committed to causing the shift to a fully sustainable world by creating and providing platforms for citizens to work together in their communities, with their municipalities, to enable sustainable development and practices to be created and implemented on a local level.
            </p>
            <p>
              My Living City’s goal is to develop and implement a  Community Sustainable Development Discussion Platform to open the current community development process to those that have traditionally not  had the opportunity for involvement or have who have had barriers to access.  We are currently building a partnership with local municipalities of the Greater Victoria Area to offer our platform for use and testing.  We plan to involve their city planning staff in the requirements definition process in order to build a product that will truly impact the community.
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h2>Our Purpose</h2>
          <p>
            By creating an online space for collaboration and co-creation, we can initiate this conversation for change. In this online space citizens can offer ideas and visions to each other, allow them to be voted on, liked or shared with others. City planners can explore trending ideas to be selected for inclusion into their development plans and programs, as well as being informed on the priorities and visions of its residents to inform planning priorities.
          </p>
          <p>
            Increasing the knowledge in the community, contributing experts can post on the sites blogs with information helping residents and cities to deepen their sustainable mindset and be more adept at making choices and decisions that reduce the impact to the environment. As well as creating an invitation for citizens to group and be the source of meaningful development in their community.
          </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;