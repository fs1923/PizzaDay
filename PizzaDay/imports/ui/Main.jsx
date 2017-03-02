import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../api/groups.js';
import { Meteor } from 'meteor/meteor';
import { PanelGroup } from 'react-bootstrap';
import Group from './Group.jsx';

class Main extends Component{

    renderGroup(){
        return this.props.groups.map((group) => (
            <Group key={group._id} group={group} />
        ));
    }
    render(){
        //if (this.props.loading) {
        //    return 'Loading';
        //}
        return(
            <div className="container">
                <a className="btn btn-success" href="/addGroup">Create group</a>
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
    //const groupsSubs = Meteor.subscribe('groups');
    Meteor.subscribe('groups');
    return {
        //loading: !groupsSubs.ready(),
        groups: Groups.find({}).fetch(),
    };
}, Main);