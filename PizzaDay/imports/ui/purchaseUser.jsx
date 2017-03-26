import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class PurchaseUser extends Component {
	render() {
		return (
			<tr>
                <td>1</td>
                <td>{Meteor.users.findOne({_id:this.props.purchase.userId}).username }</td>
                <td>{this.props.purchase.items[0].name}</td>
                <td>{this.props.purchase.items[0].quantity}</td>
                <td>{this.props.purchase.items[0].price} $</td>
                <td>{this.props.purchase.priceSum} $</td>
            </tr>
		);
	}
}
PurchaseUser.propTypes = {
    purchase: PropTypes.object.isRequired,
};