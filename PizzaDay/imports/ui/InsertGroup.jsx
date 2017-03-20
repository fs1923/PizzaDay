import React, { Component } from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

export default class InsertGroup extends Component {
    insertGroup(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        groupInstert = {name:name,mainUser:Meteor.user()._id}
        Meteor.call('Groups.insert', groupInstert , (err, result) => {
            if (err) throw err;
            browserHistory.push('/');
        });
    }
    render() {
        return (
            <div className="container">
                <h1>Add Group</h1>
                <div className="col-md-5">
                    <form>
                            <FormGroup className="relative" bsSize="large">
                                <ControlLabel className="label-form-insert">Name:</ControlLabel>
                                <FormControl className="inputName"
                                    type="text"
                                             name="name"
                                    ref="nameInput"
                             />
                            </FormGroup>
                            <Button type="submit"
                                    className="formButton"
                                    onClick={this.insertGroup.bind(this)}

                            >
                                <b>Add</b>
                            </Button>
                    </form>
                </div>
            </div>
        );
    }
}