import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';


class Group extends Component{
    deleteThisGroup() {
        Meteor.call('Groups.remove', this.props.group._id, Meteor.user() );
    }

    render(){
        return (
                <Panel header={this.props.group.name} eventKey="1"> <span>Main User:  </span>
                {Meteor.users.findOne({_id:this.props.group.mainUser}).username}
                    {this.props.currentUser ? <div className="right-menu">
                            <Link to={`/updateGroup/${this.props.group._id}`}>
                                <span className="glyphicon glyphicon-pencil">
                                </span>
                            </Link>
                            <button className="delete" onClick={this.deleteThisGroup.bind(this)}>
                            &times;
                        </button>
                        </div> : ''}</Panel>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
};
export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
},Group);
