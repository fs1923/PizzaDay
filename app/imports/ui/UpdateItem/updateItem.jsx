import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { Items } from '../../api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Spinner from '../Spinner';

class updateItem extends Component {
    updateItem(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const prise = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
        let itemUpdate = this.props.item;
        itemUpdate.name = name;
        itemUpdate.prise = prise;
        Meteor.call('Item.update', itemUpdate, (error, result) => {
            if (error)
                $.notify(error.reason, {type: "danger" });
            else
                browserHistory.push('/group/'+this.props.item.group);
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
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel className="label-form-insert">Name:</ControlLabel>
                            <FormControl className="inputName"
                                         type="text"
                                         ref="nameInput"
                                         placeholder={this.props.item.name}
                            />
                        </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel className="label-form-insert">Prise:</ControlLabel>
                            <FormControl className="inputName"
                                         type="text"
                                         ref="priceInput"
                                         pattern="\d+(\.\d{2})?"
                                         placeholder={this.props.item.prise}
                            />
                        </FormGroup>
                        <Button type="submit"
                                className="formButton"
                                onClick={this.updateItem.bind(this)}
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
    const itemsSubs = Meteor.subscribe('items');
    const groupSubs = Meteor.subscribe('groups');
    const userSubs = Meteor.subscribe('users');
    return {
            loading: !itemsSubs.ready() && !groupSubs.ready() && !userSubs.ready(),
            item: Items.findOne({_id:params.itemId}),
        }
},updateItem)