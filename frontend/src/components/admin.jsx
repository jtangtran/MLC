import React, { Component } from 'react';
import Navbar from './navbar';

const API_URL = require('../config.js')

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ideas: []
        };
        this.getUsers = this.getUsers.bind(this);
        this.getIdeas = this.getIdeas.bind(this)
    }

    componentDidMount() {
        this.getUsers();
        this.getIdeas();
    }

    async getUsers() {
        try {
            await fetch(API_URL + "/users", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }).then((response) => {
                response.json()
                .then((json) => {
                    console.log(json);
                    this.setState({users: json});
                })
            }).catch((error) => {
                throw error
            })
        }
        catch(e) {
            console.log(e.stack);
        }
    }

    async getIdeas() {
        try {
            await fetch(API_URL + "/ideas/new/0", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            }).then((response) => {
                response.json()
                .then((json) => {
                    json.forEach(element => {
                        element.idea.downvotes = element.downvoteCount;
                        element.idea.upvotes = element.upvoteCount;
                      });
                    console.log(json);
                    this.setState({ideas: json});
                })
            }).catch((error) => {
                throw error
            })
        }
        catch(e) {
            console.log(e.stack);
        }
    }

    render() {
        return (
            <div className="Admin">
                <Navbar />
                <div className="row ml-3 mr-3 mt-3">
                    <div className="table-responsive">Users
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Street Name</th>
                                    <th>Postal Code</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value.user.id}</td>
                                        <td>{value.user.email}</td>
                                        <td>{value.user.fname}</td>
                                        <td>{value.user.lname}</td>
                                        <td>{value.user.Street_Name || "unknown"}</td>
                                        <td>{value.user.Postal_Code || "unknown"}</td>
                                        <td>{value.user.RoleId}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive">Ideas
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Upvotes</th>
                                    <th>Downvotes</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ideas.map((value, index) => {
                                    return <tr key={index}>
                                        <td>{value.idea.id}</td>
                                        <td>{value.idea.category}</td>
                                        <td>{value.idea.title}</td>
                                        <td>{value.idea.description}</td>
                                        <td>{value.idea.upvotes}</td>
                                        <td>{value.idea.downvotes}</td>
                                        <td>{value.idea.User.fname} {value.idea.User.lname}</td>
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