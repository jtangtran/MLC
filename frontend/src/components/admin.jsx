import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.getUsers = this.getUsers.bind(this);
    }

    async getUsers() {
        try {
            await fetch(API_URL + "/users", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                response.json()
                .then((json) => {
                    this.setState({users: json})
                })
            }).catch((error) => {
                throw error
            })
        }
        catch(e) {
            console.log(e.stack);
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="Admin">
                <Navbar />
                <div className="row ml-3 mr-3 mt-3">Users
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <td>Id</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Street Name</td>
                                <td>Postal Code</td>
                                <td>role</td>
                            </thead>
                            <tbody>
                                {this.state.users.map((value, index) => {
                                    return <tr>
                                        <td>{value.user.id}</td>
                                        <td>{value.user.fname}</td>
                                        <td>{value.user.lname}</td>
                                        <td>{value.user.Street_Name || "unknown"}</td>
                                        <td>{value.user.Postal_Code || "unknown"}</td>
                                        <td>{value.user.role}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;