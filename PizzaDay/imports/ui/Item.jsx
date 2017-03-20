import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';




export default class Item extends Component{
    addToCart(){
        cartInstert = {UserId: Meteor.userId(), GroupId: this.props.item.group, Quantity:1, ItemId:this.props.item._id};
        Meteor.call('Cart.insert', cartInstert , (err, result) => {
            if (err) throw err;
        });
    };
    removeThisItem() {
        const beforRemoveItem = confirm('Are you sure?');
        if (beforRemoveItem) {
            Meteor.call('Item.remove', this.props.item._id);
        };
    };

    render(){
        return (

            <Panel eventKey="1">
                <span>Name item:</span>
                {this.props.item.name}
                <span> Prise: </span>
                {this.props.item.prise}
                {Meteor.user() ?
                    this.props.mainUser ?
                        <div className="right-menu">
                            <Link to={`/group/${this.props.item._id}/updateItem`}>
                                <span className="glyphicon glyphicon-pencil"></span>
                            </Link>
                            <button className="delete" onClick={this.removeThisItem.bind(this)}>
                                &times;
                            </button>
                        </div>
                        :
                        <div className="right-menu">
                            <Button onClick={this.addToCart.bind(this)}>
                                Add to cart
                            </Button>
                        </div>
                    :
                    ''
                }
            </Panel>
        );
    }
}

Request.propTypes = {
    item: PropTypes.object.isRequired,
    mainUser: PropTypes.object.isRequired,
};