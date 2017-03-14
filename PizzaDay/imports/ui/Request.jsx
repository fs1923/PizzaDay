import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';



export default class Request extends Component{
   /* deleteThisGroup() {
        let beforDeleteGroups = confirm('Are you sure?');
        if ( beforDeleteGroups === true ) {
            Meteor.call('Groups.remove', this.props.group._id, Meteor.user() );
        };
    };
    joinTheGroup(){
        userListInsert = {UserId: this.props.currentUser._id, groupId: this.props.group._id}
        Meteor.call( 'UserList.insert', userListInsert );
    };
    renderLinkName(){
        return <Link to={`/group/${this.props.group._id}`}>{this.props.group.name}</Link>
    };
    deleteRequest() {
        let beforDeleteRequest = confirm('Are you sure?');
        if ( beforDeleteRequest === true ) {
            Meteor.call('UserList.remove', this.props.userList._id);
        }
    };*/

    render(){
        return (
        <tr>
            <td>1</td>
            <td>{Meteor.users.findOne({_id:this.props.request.UserId}).username}</td>
        </tr>

        );
    }
}

Request.propTypes = {
    request: PropTypes.object.isRequired,
};

