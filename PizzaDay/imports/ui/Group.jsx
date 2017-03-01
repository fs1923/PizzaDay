import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


class Group extends Component{
    deleteThisGroup() {
        Meteor.call('Groups.remove', this.props.group._id, Meteor.user() );
    }

    render(){
        return (
                <Panel header={this.props.group.name} eventKey="1"> <span>Main User:  </span>
                {this.props.group.mainUser}
                    {this.props.currentUser ? <button className="delete" onClick={this.deleteThisGroup.bind(this)}>
                            &times;
                        </button> : ''}</Panel>
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
