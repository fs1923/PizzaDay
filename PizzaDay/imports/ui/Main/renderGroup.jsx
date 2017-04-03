import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { UserList } from '../../api/userList.js';

class Group extends Component{
    deleteThisGroup() {
        let beforDeleteGroups = confirm('Are you sure?');
        if ( beforDeleteGroups === true ) {
            Meteor.call('Groups.remove', this.props.group._id, Meteor.user() );
        };
    };
    joinTheGroup(){
        userListInsert = {UserId: this.props.currentUser._id, groupId: this.props.group._id, status: "Request"}
        Meteor.call( 'UserList.insert', userListInsert );
    };
    renderLinkName(){
        return (<Link to={`/group/${this.props.group._id}`}>{this.props.group.name}</Link>);
    };
    deleteRequest() {
        let beforDeleteRequest = confirm('Are you sure?');
        if ( beforDeleteRequest === true ) {
            Meteor.call('UserList.remove', this.props.userList._id);
        }
    };

    render(){
        return (
            <Panel header={this.renderLinkName()} eventKey="1">
                <span>Main User: {Meteor.users.findOne({_id:this.props.group.mainUser}).username}</span>

                { this.props.group.mainUser===Meteor.userId() ?
                    <div className="right-menu">
                        <Link to={`/updateGroup/${this.props.group._id}`}>
                                <span className="glyphicon glyphicon-pencil">
                                </span>
                        </Link>
                        <button className="delete" onClick={this.deleteThisGroup.bind(this)}>
                            &times;
                        </button>
                    </div>
                    :
                    this.props.currentUser ?
                        (this.props.userList) ?
                            (this.props.userList.status === "Follow") ?
                                <div className="join-button">
                                    Subscribed
                                    <Button title="delete request!!!"  bsStyle="link" onClick={this.deleteRequest.bind(this)}>
                                        Unsubscibed
                                    </Button>
                                </div>
                                :
                                <div className="join-button">
                                    Your request is being processed...
                                    <Button title="delete request!!!"  bsStyle="link" onClick={this.deleteRequest.bind(this)}>
                                        Remove request
                                    </Button>
                                </div>
                            :
                            <div className="join-button">
                                <Button  bsStyle="link" onClick={this.joinTheGroup.bind(this)}>
                                    join the group
                                </Button>
                            </div>
                        : ''
                }
            </Panel>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
    
};
export default createContainer((props) => {
    Meteor.subscribe('userList');
    return {
        currentUser: Meteor.user(),
        userList:UserList.findOne({UserId: Meteor.userId(), groupId: props.group._id}),
    };
},Group);
