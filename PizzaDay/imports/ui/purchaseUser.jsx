import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class PurchaseUser extends Component {
	renderItemName(){
        return this.props.purchase.items.map((item) => (
            <span key={item.name}>{item.name}<br/></span>
        ));
    };
    renderItemQuantity(){
        return this.props.purchase.items.map((item) => (
            <span key={item.name}>{item.quantity}<br/></span>
        ));
    };
    renderItemPrice(){
        return this.props.purchase.items.map((item) => (
            <span key={item.name}>{item.price} $<br/></span>
        ));
    };
	render() {
		return (
			<tr>
                <td>1</td>
                <td>{Meteor.users.findOne({_id:this.props.purchase.userId}).username }</td>
                <td>{this.renderItemName()}</td>
                <td>{this.renderItemQuantity()}</td>
                <td>{this.renderItemPrice()} </td>
                <td>{this.props.purchase.priceSum} $</td>
            </tr>
		);
	}
}
PurchaseUser.propTypes = {
    purchase: PropTypes.object.isRequired,
};