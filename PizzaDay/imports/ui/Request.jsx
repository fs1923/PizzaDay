import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';




export default class Request extends Component{
    deleteRequestForMainUser() {
        let beforRemoveRequest = confirm('Are you sure?');
        if ( beforRemoveRequest === true ) {
            Meteor.call('UserList.remove', this.props.request._id, Meteor.user() );
        };
    };
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
            <td>{Meteor.users.findOne({_id:this.props.request.UserId}).username }</td>
            <td>
                <div className="right-menu">
                    <Button bsStyle="link">
                        Accept
                    </Button>
                    <button className="delete" onClick={this.deleteRequestForMainUser.bind(this)}>
                        &times;
                    </button>
                </div>
            </td>
        </tr>
        );
    }
}

Request.propTypes = {
    request: PropTypes.object.isRequired,
};

