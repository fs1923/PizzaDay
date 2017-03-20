import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { Groups } from '../api/groups.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Spinner from './Spinner'


class updateGroups extends Component {
    updateGroup(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        groupUpdate = this.props.group;
        groupUpdate.name = name;
        Meteor.call('Groups.update', groupUpdate, (error, result) => {
            if (error)
                $.notify(error.reason, {type: "danger" });
            else
                browserHistory.push('/');
        });
    }
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <h1>Update Group</h1>
                <div className="col-md-5">
                    <form>
                        <FormGroup bsSize="large">
                            <ControlLabel className="label-form-insert">Name:</ControlLabel>
                            <FormControl className="inputName"
                                         type="text"
                                         ref="nameInput"
                                         placeholder={this.props.group.name}
                            />
                        </FormGroup>
                        <Button type="submit"
                                className="formButton"
                                onClick={this.updateGroup.bind(this)}

                        >

                            <b>Update</b>
                        </Button>
                    </form>
                </div>
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
},updateGroups)