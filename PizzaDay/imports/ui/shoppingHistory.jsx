import React, { Component, PropTypes } from 'react';

export default class ShoppingHistory extends Component {
	render() {
		return (
			<tr>
                <td>1</td>
                <td>{Meteor.users.findOne({_id:this.props.purchase.userId}).username }</td>
                <td>{this.props.purchase.items[0].name}</td>
                <td>{this.props.purchase.items[0].quantity}</td>
                <td>{this.props.purchase.items[0].price} $</td>
                <td>{this.props.purchase.priceSum} $</td>
                <td>
                    <div className="right-menu">
                        <button className="delete">
                            &times;
                        </button>
                    </div>
                </td>
            </tr>
		);
	}
}
ShoppingHistory.propTypes = {
    purchase: PropTypes.object.isRequired,
};