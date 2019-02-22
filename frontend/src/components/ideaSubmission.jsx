import React, { Component } from 'react';
import Navbar from './navbar.jsx';

class IdeaSubmission extends Component {
  render() {
    return (
      <div className="IdeaSubmission">
        <Navbar/>
        <div className="row mt-5 mr-0 ml-0">
            <div className="col-2">
            </div>
            <div className="col-8">
            <form>
                <div className="form-group">
                    <p>Whats Your Idea?</p>
                    <input type="text" className="form-control" id="ideaTitleInput" aria-describedby="ideaTitle" placeholder="Enter the title for your Idea."/>
                </div>
                <div className="form-group">
                    <p>Describe your Idea.</p>
                    <textarea className="form-control" id="ideaDescriptionInput" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <p>How does your idea affect the community positively? (7 Petals)</p>
                    <input type="text" className="form-control" id="placePetalInput" aria-describedby="placePetal" placeholder="Place"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="waterPetalInput" aria-describedby="waterPetal" placeholder="Water"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="energyPetalInput" aria-describedby="energyPetal" placeholder="Energy"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="healthPetalInput" aria-describedby="healthPetal" placeholder="Health and Happiness"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="materialsPetalInput" aria-describedby="materialsPetal" placeholder="Materials"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="equityPetalInput" aria-describedby="equityPetal" placeholder="Equity"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="beautyPetalInput" aria-describedby="beautyPetal" placeholder="Beauty"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Upload Pictures</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                        <label className="custom-file-label">Choose file</label>
                    </div>
                </div>           
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit your Idea!</button>
                </div>
                </form>
            </div>
            <div className="col-2">
            </div>
        </div>
      </div>
    );
  }
}

export default IdeaSubmission;