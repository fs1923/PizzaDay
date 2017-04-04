import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { UserList } from '../../api/userList.js';
import { Meteor } from 'meteor/meteor';
import { Table, Col, Tabs, Tab } from 'react-bootstrap';
import Request from './renderRequest.jsx';
import Spinner from '../Spinner';
import { Link } from 'react-router';
import MemberGroup from './renderMember.jsx';

class RequestUser extends Component{

    renderRequest(){
        return this.props.userList.map((request) => (
            <Request key={request._id} request={request} />
        ));
    };
    renderMembersGroups() {
        return this.props.membersGroups.map((memberGroup) => (
            <MemberGroup key={memberGroup._id} memberGroup={memberGroup} />
        ));
    };
    render(){
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <h1>Users Requests and members LIST</h1>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example"> 
                    <Tab eventKey={1} title="Requests"> 
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>email</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRequest()}
                            </tbody>
                    
                        </Table>
                    </Tab>
                    <Tab eventKey={2} title="Members">
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>email</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderMembersGroups()}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>  
            </div>
        );
    }
}
RequestUser.propTypes = {
    userList: PropTypes.array.isRequired,
    membersGroups: PropTypes.array.isRequired,
};
export default createContainer(({params}) => {
    const requesSubs = Meteor.subscribe('userList');
    const userSubs = Meteor.subscribe('users');
    const shoppingSubs = Meteor.subscribe('shopping');
    const groupSubs = Meteor.subscribe('groups');

    return {
        loading: !requesSubs.ready() && !userSubs.ready() && !shoppingSubs.ready() && !groupSubs.ready(),
        userList: UserList.find({groupId: params.groupId, status: "Request"}).fetch(),
        membersGroups: UserList.find({groupId: params.groupId, status: "Follow"}).fetch(),
    };
}, RequestUser);