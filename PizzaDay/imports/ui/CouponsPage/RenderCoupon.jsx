import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/items';

export default class RenderCoupon extends Component {
    removeThisCoupons() {
        const beforRemove = confirm('Are you sure?');
        if (beforRemove) {
            Meteor.call('Coupons.remove', this.props.coupon);
        };
    };
    render() {
        return (
            <tr>
                <td>{Items.findOne({_id:this.props.coupon.item}).name}</td>
                <td>{this.props.coupon.day}</td>
                <td>{this.props.coupon.quantity}</td>
                <td>{this.props.coupon.persent+"%"}</td>
                <td>
                    <div className="right-menu">
                        <button className="delete" onClick={this.removeThisCoupons.bind(this)}>
                            &times;
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}
RenderCoupon.propTypes = {
    coupon: PropTypes.object.isRequired,
};