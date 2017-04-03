import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Checkbox, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Items } from '../../api/items.js';

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
        return (
            <div className="container">
                <h1>Add Coupon</h1>
                <div className="col-md-5">
                    <form onSubmit={this.insertCoupon.bind(this)}>
                        <h1>Item</h1>
                        <FormControl componentClass="select" placeholder="select" ref="item">
                            {this.renderCart()}
                        </FormControl>
                        <h1>Day</h1>
                        <FormControl componentClass="select" placeholder="select" ref="day">
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </FormControl>
                        <Row>
                            <Col md={8}>
                                <h1>How much to buy?</h1>
                                <input type="number" name="quantity" min="2" max="100" ref="quantity"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <h1>How persent next this item</h1>
                                <input type="number" name="quantity" min="1" max="100" ref="persent"/>
                            </Col>
                        </Row>
                        {/*<FormGroup>*/}
                            {/*<Checkbox ref="monday">*/}
                                {/*Monday*/}
                            {/*</Checkbox>*/}
                            {/*{' '}*/}
                            {/*<Checkbox ref="Tuesday">*/}
                                {/*Tuesday*/}
                            {/*</Checkbox>*/}
                            {/*{' '}*/}
                            {/*<Checkbox ref="Wednesday">*/}
                                {/*Wednesday*/}
                            {/*</Checkbox>*/}
                            {/*{' '}*/}
                            {/*<Checkbox inline ref="Thursday">*/}
                                {/*Thursday*/}
                            {/*</Checkbox>*/}
                            {/*{' '}*/}
                            {/*<Checkbox inline ref="Friday">*/}
                                {/*Friday*/}
                            {/*</Checkbox>*/}
                            {/*{' '}*/}
                            {/*<Checkbox inline ref="Saturday">*/}
                                {/*Saturday*/}
                            {/*</Checkbox>*/}
                            {/*{' '}*/}
                            {/*<Checkbox inline ref="Sunday">*/}
                                {/*Sunday*/}
                            {/*</Checkbox>*/}
                        {/*</FormGroup>*/}
                        <Button type="submit"
                                className="formButton"

                        >
                            <b>Add</b>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
export default createContainer(({params}) => {
    const itemSubs = Meteor.subscribe('items');
    return {
        loading: !itemSubs.ready(),
        items: Items.find({group:params.groupId}).fetch(),
    };
},InsertCoupon)
