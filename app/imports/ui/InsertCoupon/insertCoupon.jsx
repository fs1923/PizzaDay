import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Checkbox, Row, Col, ControlLabel, Grid } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Items } from '../../api/items.js';
import Spinner from '../Spinner';

class InsertCoupon extends Component {
    insertCoupon(event) {
        event.preventDefault();

        const item = ReactDOM.findDOMNode(this.refs.item).value;
        const day = ReactDOM.findDOMNode(this.refs.day).value;
        const quantity = ReactDOM.findDOMNode(this.refs.quantity).value;
        const persent = ReactDOM.findDOMNode(this.refs.persent).value;
        const couponInstert = {item:item, day:day, quantity:quantity, persent:persent, groupId: this.props.params.groupId};
        Meteor.call('Coupons.insert', couponInstert , (error, result) => {
            if (error)
                $.notify(error.reason, {type: "danger" });
            else
                browserHistory.push('/group/' + this.props.params.groupId + '/Coupons');
        });
    }
    renderCart(){
        return this.props.items.map((item) => (
            <option value={item._id} key={item._id}>{item.name}</option>
        ));
    };
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <Grid>
                <h1>Add Coupon</h1>
                <Col md={6}>
                    <form onSubmit={this.insertCoupon.bind(this)} className="insert-coupons">
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel className="label-form-insert">select Item:</ControlLabel>
                            <FormControl  componentClass="select" className="inputName" placeholder="select" ref="item">
                                {this.renderCart()}
                            </FormControl>
                        </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel className="label-form-insert">select Day:</ControlLabel>
                            <FormControl className="inputName" componentClass="select" placeholder="select" ref="day">
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </FormControl>
                        </FormGroup>
                        <Row className="bottom-margin">
                            <p className="input-number">
                                <span className="text-over-number">How much to buy?</span>
                                <input type="number" className="inputName right" name="quantity" min="2" max="100" ref="quantity"/>
                            </p>
                            <p className="input-number">
                                <span className="text-over-number">Discount in persent</span>
                                <input type="number" className="inputName right" name="quantity" min="1" max="100" ref="persent"/>
                            </p>
                         </Row>
                        <Button type="submit"
                                className="formButton"

                        >
                            <b>Add</b>
                        </Button>
                    </form>
                </Col>
            </Grid>
        );
    }
}
export default createContainer(({params}) => {
    const itemSubs = Meteor.subscribe('items');
    const groupSubs = Meteor.subscribe('groups');
    const userSubs = Meteor.subscribe('users');
    return {
        loading: !itemSubs.ready() && !groupSubs.ready() && !userSubs.ready(),
        items: Items.find({group:params.groupId}).fetch(),
    };
},InsertCoupon)
