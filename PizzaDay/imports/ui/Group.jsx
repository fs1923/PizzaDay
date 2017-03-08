import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';



class Group extends Component{
    deleteThisGroup() {
        Meteor.call('Groups.remove', this.props.group._id, Meteor.user() );
    };
    joinTheGroup(){
        userListInsert = {UserId: this.props.currentUser._id, groupId: this.props.group._id}
        Meteor.call( 'User.insert', userListInsert );
    };
    render(){
        return (
                <Panel header={this.props.group.name} eventKey="1"> <span>Main User:  </span>
                {Meteor.users.findOne({_id:this.props.group.mainUser}).username}
                    { this.props.currentUser ?
                     <div className="right-menu">
                            <Link to={`/updateGroup/${this.props.group._id}`}>
                                <span className="glyphicon glyphicon-pencil">
                                </span>
                            </Link>
                            <button className="delete" onClick={this.deleteThisGroup.bind(this)}>
                            &times;
                            </button>
                             <Button  bsStyle="link" onClick={this.joinTheGroup.bind(this)}>join the group</Button>
                     </div> : 'Зареєструйтеся'} </Panel>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
};
export default createContainer(() => {
    Meteor.subscribe('userList');
    return {
        currentUser: Meteor.user(),
    };
},Group);
