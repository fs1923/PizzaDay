import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Items } from '../api/items.js';
import { Coupons } from '../api/coupons'

class RenderCart extends Component{
    deleteThisCart(){
            Meteor.call('Cart.remove', this.props.cart._id );
    }
    render(){
        return (
            <tr>
                {this.props.coupons?
                    <td>{this.props.item.name + " 1 in "+this.props.coupons.quantity+" -"+this.props.coupons.persent+"%"}</td>
                    :
                    <td>{this.props.item.name}</td>
                }
                {this.props.coupons?
                    <td>{this.props.item.prise*this.props.cart.Quantity-
                        this.props.item.prise*Math.floor(this.props.cart.Quantity/this.props.coupons.quantity)*(this.props.coupons.persent/100)
                        +"$"}
                    </td>
                    :
                    <td>{this.props.item.prise*this.props.cart.Quantity+"$"}</td>
                }
                <td>{this.props.cart.Quantity}</td>
                <td>
                    <button className="delete" onClick={this.deleteThisCart.bind(this)}>
                        &times;
                    </button>
                </td>
            </tr>
        );
    }
}

Request.propTypes = {
    cart: PropTypes.object.isRequired,
};

export default createContainer((props) => {
    return {
        item: Items.findOne({_id:props.cart.ItemId}),
        coupons: Coupons.findOne({item:props.cart.ItemId}),
    };
},RenderCart);