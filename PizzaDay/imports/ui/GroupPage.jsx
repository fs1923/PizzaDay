import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Spinner from './Spinner'

class GroupPage extends Component {
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <h1>{this.props.group.name}</h1>
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
