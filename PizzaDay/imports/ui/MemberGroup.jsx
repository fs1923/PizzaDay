import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';




export default class MemberGroup extends Component{
    removeMembers() {
        let beforRemoveMembers = confirm('Are you sure?');
        if ( beforRemoveMembers === true ) {
            Meteor.call('MembersGroups.remove', this.props.memberGroup._id );
        };
    };
/*    acceptUsers() {
        let beforAcceptMembers = confirm('Are you sure?');
        if ( beforAcceptMembers === true ) {
            Meteor.call('MembersGroups.insert', this.props.request.UserId );
            Meteor.call('UserList.remove', this.props.request._id );
        };
    };*/
/*    joinTheGroup(){
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
            <td>{ Meteor.users.findOne({_id: this.props.memberGroup.user}).username }</td>
            <td>{ Meteor.users.findOne({_id: this.props.memberGroup.user}).emails[0].address }</td>
            <td>
                <div className="right-menu">
                    <button className="delete" onClick={this.removeMembers.bind(this)} >
                        &times;
                    </button>
                </div>
            </td>
        </tr>
        );
    }
}

MemberGroup.propTypes = {
    memberGroup: PropTypes.object.isRequired,
};

