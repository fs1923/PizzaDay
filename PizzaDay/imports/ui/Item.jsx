import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';




export default class Item extends Component{
    addToCart(){
        cartInstert = {UserId: Meteor.userId(), GroupId: this.props.item.group, ItemId:this.props.item._id};
        Meteor.call('Cart.insert', cartInstert , (err, result) => {
            if (err) throw err;
        });
    }

    render(){
        return (


            <Panel eventKey="1">
                <span>Name item:</span>
                {this.props.item.name}
                <span> Prise: </span>
                {this.props.item.prise}
                {Meteor.user() ?
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
};