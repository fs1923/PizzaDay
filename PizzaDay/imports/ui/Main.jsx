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
        return(
            <div className="container">
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
    Meteor.subscribe('groups');

    return {
        groups: Groups.find({}).fetch(),
    };
}, Main);