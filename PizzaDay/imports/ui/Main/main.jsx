import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../api/groups.js';
import { Meteor } from 'meteor/meteor';
import { PanelGroup } from 'react-bootstrap';
import Group from './renderGroup.jsx';
import Spiner from '../Spinner'
import { Link } from 'react-router';


class Main extends Component{

    renderGroup(){
        return this.props.groups.map((group) => (
            <Group key={group._id} group={group} />
        ));
    }
    render(){
        if (this.props.loading) {
            return <Spiner/>;
        }
        return(
             <div className="container">
                 { this.props.currentUser ? <Link className="btn btn-success" to="/addGroup">Create group</Link> : '' }
                <h1>Group LIST</h1>
                <PanelGroup>
                    {this.renderGroup()}
                </PanelGroup>
            </div>
        );
    }
}
Main.propTypes = {
    groups: PropTypes.array.isRequired,
};
export default createContainer(() => {
    const groupsSubs = Meteor.subscribe('groups');
    const userSubs = Meteor.subscribe('users');
    const userListSubs = Meteor.subscribe('userList');
    return {
        loading: !groupsSubs.ready() && !userSubs.ready() && !userListSubs.ready(),
        groups: Groups.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, Main);