import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Spinner from './Spinner';
import { Link } from 'react-router';

class GroupPage extends Component {
    renderLink() {
        return (<Link to={`/group/${this.props.params.groupId}/request`}>request && members</Link>);
    };
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1>{this.props.groupPage.name}</h1>
                    </div>
                    <div className="col-md-2">
                       {(this.props.groupPage.mainUser === Meteor.userId()) ? <Button bsStyle="link">{this.renderLink()}</Button> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer(({params}) => {
    const groupsSubs = Meteor.subscribe('groups');
    const userSubs = Meteor.subscribe('users');
    return {
        loading: !groupsSubs.ready() && userSubs.ready(),
        groupPage: Groups.findOne({_id:params.groupId}),
    };
},GroupPage)
