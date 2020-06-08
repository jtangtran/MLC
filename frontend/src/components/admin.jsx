import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {

    }

    render() {
        return (
            <div className="Admin">
                <Navbar />
            </div>
        );
    }
}

export default Admin;