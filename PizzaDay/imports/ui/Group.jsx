import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

export default class Group extends Component{
    render(){
        return (
                <Panel header={this.props.group.name} eventKey="1"> <span>Main User:  </span>
                {this.props.group.mainUser}</Panel>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
};