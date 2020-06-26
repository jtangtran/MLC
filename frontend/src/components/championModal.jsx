import React, { Component } from 'react';

class ChampionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            reason: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.champion = this.champion.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    champion(e) {
        console.log(this.state);
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
                                <form onSubmit={this.champion}>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" name="description" className="form-control text-center" id="descriptionInput" placeholder="e.g. My name is..." required/>
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.handleChange} type="text" name="reasons" className="form-control text-center" id="reasonsInput" placeholder="e.g. I love my community" required/>
                                    </div>
                                    <div id="statusContainer">
                                        <button id="submitBtn" type="submit" className="btn btn-primary">Submit Champion Form</button>
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