import React, { Component } from 'react';
const API_URL = require('../config.js')


class ChampionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            reason: '',
            state: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.champion = this.champion.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async updateIdea(e){
        e.preventDefault();
        let data = JSON.stringify({
            idea: {
                name:this.state.name,
                reasons:this.state.description,
                state:this.state.state
            }
        });
        let response = await fetch(API_URL + "/proposal/" + this.props.match.params.id, { 
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: data,
            credentials: 'include'
          })
          .then(res => {
            if (response.ok){
                console.log(response);
            }
            return res.json();
          })
          .catch(error => {
            console.log("Error: " + error);
          });
      }

    // handelReasonChange(event) {
    //     this.setState({[event.target.reason]: event.target.value});
    // }

    champion(e) {
        e.preventDefault();
        console.log(this.state);
        window.location.reload();
    }

    render() {
        return (
            <div className="ChampionModal">
                <div className="modal fade" id="championModal" role="dialog" aria-labelledby="championModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="championModalLabel">Champion Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <form onSubmit={(e) => this.champion(e)}>
                                    <div className="form-group">
                                        Name:
                                        <input onChange={this.handleChange} type="text" name="name" className="form-control text-center" id="descriptionInput" placeholder="e.g. My name is..." required/>
                                    </div>
                                    <div className="form-group">
                                        Reason:
                                        <textarea onChange={this.handleChange} type="text" name="reason" className="form-control text-left" id="reasonsInput" placeholder="e.g. I love my community" required/>
                                    </div>
                                    <div id="statusContainer">
                                        <button onClick={(e) => this.updateIdea(e)} id="submitBtn" type="submit" className="btn btn-primary">Submit Champion Form</button>
                                        <div>
                                            <i id="confirmIcon" hidden className="fas fa-check fa-2x"></i>
                                            <i id="denyIcon" hidden className="far fa-times-circle fa-2x"></i>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChampionModal;