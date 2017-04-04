import React, { Component } from 'react';
import { FormGroup, FormControl, Button, ControlLabel, InputGroup } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Items from '../../api/items';
import { createContainer } from 'meteor/react-meteor-data';
import Spinner from '../Spinner';

class InsertItem extends Component {
    insertItem(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const prise = ReactDOM.findDOMNode(this.refs.priseInput).value.trim();
        let files = $("input.file_bag")[0].files;
        var uploader = new Slingshot.Upload("myFileUploads");
        const path = '/group/' + this.props.params.groupId;
        const group = this.props.params.groupId;
        uploader.send(files[0], function (error, downloadUrl) {
            if (error) {
                // Log service detailed response
                $.notify(error.reason, {type: "danger" });
                // alert (error);
            }
            else {
                const url = downloadUrl;
                itemInstert = {name: name, prise: prise, group: group, url:url}
                Meteor.call('Items.insert', itemInstert, (error, result) => {
                    if (error)
                        $.notify(error.reason, {type: "danger" });
                    else
                        browserHistory.push(path);
                });
            }
        });
    }
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <h1>Add Item</h1>
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
                        <FormGroup className="relative" bsSize="large">
                            <InputGroup>
                                <ControlLabel className="label-form-insert" >Prise:</ControlLabel>
                                <FormControl className="inputName"
                                             type="text"
                                             name="prise"
                                             ref="priseInput"
                                             pattern="\d+(\.\d{2})?"
                                />
                                <InputGroup.Addon>$</InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel>Image:</ControlLabel>
                            <p>
                                <input type="file" className="file_bag"/>
                            </p>
                        </FormGroup>
                        <Button type="submit"
                                className="formButton"
                                onClick={this.insertItem.bind(this)}
                        >
                            <b>Add</b>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
export default createContainer(() => {
    const groupSubs = Meteor.subscribe('groups');
    const userSubs = Meteor.subscribe('users')
    return {
        loading: !groupSubs.ready() && !userSubs.ready(),
    };
},InsertItem )