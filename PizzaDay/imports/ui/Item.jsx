import React, { Component, PropTypes } from 'react';
import { Panel, Button, Col, Thumbnail } from 'react-bootstrap';
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
        
                    <Col md={4}>
                        <Thumbnail src="/" alt="242x200" className="relative">
                            <h3>{this.props.item.name}</h3>
                            <p>{this.props.item.prise} $</p>
                            
                                {Meteor.user() ?
                                    this.props.mainUser ?
                                        <p className="Edit-button-item">
                                            <Link to={`/group/${this.props.item._id}/updateItem`}>
                                                <span className="glyphicon glyphicon-pencil"></span>
                                            </Link>
                                            <button className="delete" onClick={this.removeThisItem.bind(this)}>
                                                &times;
                                            </button>
                                        </p>
                                        :
                                        <p>
                                            <Button onClick={this.addToCart.bind(this)} bsStyle="default">Add to cart</Button>
                                        </p>
                                :
                                ''
                            }
                            
                        </Thumbnail>
                    </Col>
        );
    }
}

Request.propTypes = {
    item: PropTypes.object.isRequired,
    mainUser: PropTypes.object.isRequired,
};