import React, { Component } from 'react';
import Navbar from './navbar.jsx';

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
            beauty_petal: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.postIdea = this.postIdea.bind(this);
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

        let response = await fetch("http://localhost:3000/api/ideas", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: data
        });
        if (response.ok){
            console.log('Idea posted successfully')
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
        <div className="row mt-5 mr-0 ml-0">
            <div className="col-2">
            </div>
            <div className="col-8">
            <form onSubmit={this.postIdea}>
                <div className="form-group">
                    <p>Whats Your Idea?</p>
                    <input onChange={this.handleChange} name="title" type="text" className="form-control" id="ideaTitleInput" aria-describedby="ideaTitle" placeholder="Enter the title for your Idea."/>
                </div>
                <div className="form-group">
                    <p>Describe your Idea.</p>
                    <textarea onChange={this.handleChange} name="description" className="form-control" id="ideaDescriptionInput" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <p>How does your idea affect the community positively? (7 Petals)</p>
                    <input onChange={this.handleChange} name="place_petal" type="text" className="form-control" id="placePetalInput" aria-describedby="placePetal" placeholder="Place"/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="water_petal" type="text" className="form-control" id="waterPetalInput" aria-describedby="waterPetal" placeholder="Water"/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="energy_petal" type="text" className="form-control" id="energyPetalInput" aria-describedby="energyPetal" placeholder="Energy"/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="health_petal" type="text" className="form-control" id="healthPetalInput" aria-describedby="healthPetal" placeholder="Health and Happiness"/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="materials_petal" type="text" className="form-control" id="materialsPetalInput" aria-describedby="materialsPetal" placeholder="Materials"/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="equity_petal" type="text" className="form-control" id="equityPetalInput" aria-describedby="equityPetal" placeholder="Equity"/>
                </div>
                <div className="form-group">
                    <input onChange={this.handleChange} name="beauty_petal" type="text" className="form-control" id="beautyPetalInput" aria-describedby="beautyPetal" placeholder="Beauty"/>
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
