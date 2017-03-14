import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { UserList } from '../api/userList.js';
import { Meteor } from 'meteor/meteor';
import { Table } from 'react-bootstrap';
import Request from './Request.jsx';
import Spiner from './Spinner'
import { Link } from 'react-router';


class RequestUser extends Component{

    renderRequest(){
        return this.props.userList.map((request) => (
            <Request key={request._id} request={request} />
        ));
    }
    render(){
        if (this.props.loading) {
            return <Spiner/>;
        }
        return(
            <div className="container">
                <h1>Users Requests LIST</h1>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRequest()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
RequestUser.propTypes = {
    userList: PropTypes.array.isRequired,
};
export default createContainer(() => {
    const requesSubs = Meteor.subscribe('userList');
    Meteor.subscribe('users');

    return {
        loading: !requesSubs.ready(),
        userList: UserList.find({}).fetch(),
    };
}, RequestUser);