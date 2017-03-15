import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import Spinner from './Spinner'

class GroupPage extends Component {
    deleteThisGroup() {
        let beforDeleteGroups = confirm('Are you sure?');
        if ( beforDeleteGroups === true ) {
            Meteor.call('Groups.remove', this.props.group._id, Meteor.user() );
            browserHistory.push('/');
        };
    };
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (

            <div className="container">
                <h1>{this.props.group.name}</h1>
                <button className="delete-group" onClick={this.deleteThisGroup.bind(this)}>
                    &times;
                </button>
                <Link className="edit" to={`/updateGroup/${this.props.group._id}`}>
                                <span className="glyphicon glyphicon-pencil">
                                </span>
                </Link>
            </div>




        );
    }
}
export default createContainer(({params}) => {
    const groupsSubs = Meteor.subscribe('groups');
    return {
        loading: !groupsSubs.ready(),
        group: Groups.findOne({_id:params.groupId}),
    }
},GroupPage)
