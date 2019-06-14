import React, { Component } from 'react';
import Navbar from './navbar.jsx';

const API_URL = require('../config.js');

class IdeaSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            place_petal: '',
            water_petal: '',
            energy_petal: '',
            health_petal: '',
            materials_petal: '',
            equity_petal: '',
            beauty_petal: '',
            image: '',
            ideaLink: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.postIdea = this.postIdea.bind(this);
    }

    componentDidMount(){
        const images = document.getElementById('pictureUpload');
        images.addEventListener('input', function (evt) {
            console.log(evt.target.files);
            document.getElementById('fileText').innerText = evt.target.files[0].name;
        });

        const userLoggedIn = sessionStorage.getItem('loggedin');
        const signInWarning = document.getElementById('signInWarning');
        const submitIdeaBtn = document.getElementById('submitIdeaBtn');
        if(userLoggedIn){
            signInWarning.hidden = true;
            submitIdeaBtn.hidden = false;
        }
        else{
            signInWarning.hidden = false;
            submitIdeaBtn.hidden = true;
        }
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async postIdea(e){
        e.preventDefault();
        try{
        let data = JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            place_petal: this.state.place_petal,
            water_petal: this.state.water_petal,
            energy_petal: this.state.energy_petal,
            health_petal: this.state.health_petal,
            materials_petal: this.state.materials_petal,
            equity_petal: this.state.equity_petal,
            beauty_petal: this.state.beauty_petal
        });

        let response = await fetch(API_URL+"/idea", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: data
        });
        if (response.ok){
            console.log('Idea posted successfully')
            const images = document.getElementById('pictureUpload');
            let formData  = new FormData();
            formData.append('file', images.files[0]);
            response.json().then(async (data) => {
                let imageResponse = await fetch(API_URL+"/idea/" + data.id + "/images", {
                    method: "POST",
                    body: formData
                });

                if(imageResponse.ok){
                    console.log('Image Uploaded')
                    this.setState({ideaLink:  'http://dev.mylivingcity.org/idea/'+ data.id})
                    document.getElementById('seeIdea').hidden = false;
                    document.getElementById('signInWarning').hidden = true;
                    document.getElementById('submitIdeaBtn').hidden = true;
                }
                else{
                    console.log('image failed')
                }
            });
        }
        else{
            console.log('Idea post failed', response)
        }
        }
        catch(e){
            console.log(e.stack);
        }
    }


render() {
    return (
    <div className="IdeaSubmission">
        <Navbar/>
        <h1 className="pt-3 pl-4 pb-4">Submit Idea</h1>
        <div className="row mt-2 mr-0 ml-0">
            <div className="col-2">
            </div>
            <div className="col-8">
            <form onSubmit={this.postIdea}>
                <div className="form-group">
                    <p>Whats Your Idea?</p>
                    <input onChange={this.handleChange} name="title" type="text" className="form-control" id="ideaTitleInput" aria-describedby="ideaTitle" placeholder="Enter the title for your Idea." required/>
                </div>
                <div className="form-group">
                    <p>Describe your Idea.</p>
                    <textarea onChange={this.handleChange} name="description" className="form-control" id="ideaDescriptionInput" rows="3" required></textarea>
                </div>
                <div className="form-group">
                    <p>How does your idea affect the community positively? (7 Petals)</p>
                    <input onChange={this.handleChange} name="place_petal" type="text" className="form-control" id="placePetalInput" aria-describedby="placePetal" placeholder="Place" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="water_petal" type="text" className="form-control" id="waterPetalInput" aria-describedby="waterPetal" placeholder="Water" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="energy_petal" type="text" className="form-control" id="energyPetalInput" aria-describedby="energyPetal" placeholder="Energy" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="health_petal" type="text" className="form-control" id="healthPetalInput" aria-describedby="healthPetal" placeholder="Health and Happiness" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="materials_petal" type="text" className="form-control" id="materialsPetalInput" aria-describedby="materialsPetal" placeholder="Materials" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="equity_petal" type="text" className="form-control" id="equityPetalInput" aria-describedby="equityPetal" placeholder="Equity" required/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="beauty_petal" type="text" className="form-control" id="beautyPetalInput" aria-describedby="beautyPetal" placeholder="Beauty" required />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Upload Picture</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="pictureUpload"/>
                        <label className="custom-file-label" id="fileText">Choose file</label>
                    </div>
                </div>           
                <div className="text-center">
                    <p id="seeIdea" hidden className="lead">Thanks for Posting!<br/><a href={this.state.ideaLink}>See your Idea</a></p>
                    <button id="submitIdeaBtn" type="submit" className="btn btn-primary">Submit your Idea!</button>
                    <button id="signInWarning" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">Sign In To Post</button>
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
