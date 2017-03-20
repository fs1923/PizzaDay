import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { Items } from '../api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import { PanelGroup, FormGroup, FormControl, Button, ControlLabel, Col, Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Spinner from './Spinner';
import { Link } from 'react-router';
import Item from '../ui/Item.jsx';
import { Cart } from '../api/cart.js';
import RenderCart from './RenderCart'


class GroupPage extends Component {
    renderItem(){
        return this.props.items.map((item) => (
            <Item key={item._id} item={item} mainUser={this.props.groupPage.mainUser === Meteor.userId()} />
        ));
    };
    renderCart(){
        return this.props.cart.map((cart) => (
            <RenderCart key={cart._id} cart={cart}/>
        ));
    };
    deleteThisGroup() {
        let beforDeleteGroups = confirm('Are you sure?');
        if ( beforDeleteGroups ) {
            Meteor.call('Groups.remove', this.props.params.groupId, Meteor.user() );
        };
    };
    removeCart() {
        let beforRemoveCart = confirm('Are you sure?');
        if ( beforRemoveCart ) {
            Meteor.call('CartAll.remove');
        }
    };
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <div className="row">
                    <Col xs={9} md={9} >
                        <h1>{this.props.groupPage.name}</h1>
                    </Col>
                    {(this.props.groupPage.mainUser === Meteor.userId()) ?
                        <Col xs={3} md={3} >
                            <Link to={`/group/${this.props.params.groupId}/request`}>request && members</Link>
                            <div className="right-menu">
                                <Link to={`/updateGroup/${this.props.params.groupId}`}>
                                    <span className="glyphicon glyphicon-pencil"></span>
                                </Link>
                                <button className="delete" onClick={this.deleteThisGroup.bind(this)}>
                                    &times;
                                </button>
                            </div>
                        </Col>

                        :
                        ''
                    }
                </div>
                {(this.props.groupPage.mainUser === Meteor.userId()) ?
                    <div>
                        <Link className="btn btn-success" to={`/group/${this.props.groupPage._id}/insertItem`}>Add item</Link>
                    </div>
                    :
                    ''
                }
                <div className="row">
                    <Col xs={8} md={8}>
                        <h1>Items</h1>
                        <PanelGroup>
                            {this.renderItem()}
                        </PanelGroup>
                    </Col>
                    <Col xs={4} md={4}>
                        <h1>Carts</h1>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Prise</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                                {this.props.cartCheck ? <tr>
                                     <td></td>
                                     <td></td>
                                     <td></td>
                                     <td><Button onClick={this.removeCart.bind(this)} className="right-menu" bsStyle="danger">Remove</Button></td>

                                </tr> : ''}
                            </tbody>
                        </Table>
                    </Col>
                </div>
            </div>
        );
    }
}
GroupPage.propTypes = {
    items: PropTypes.array.isRequired,
};
export default createContainer(({params}) => {
    const groupsSubs = Meteor.subscribe('groups');
    const userSubs = Meteor.subscribe('users');
    const itemSubs = Meteor.subscribe('items');
    const cartSubs = Meteor.subscribe('cart');
    return {
        loading: !groupsSubs.ready() && !userSubs.ready() && !itemSubs.ready() && !cartSubs.ready(),
        groupPage: Groups.findOne({_id:params.groupId}),
        items: Items.find({group:params.groupId}).fetch(),
        cart: Cart.find({UserId:Meteor.userId(),GroupId:params.groupId}).fetch(),
        cartCheck: Cart.findOne({UserId:Meteor.userId(),GroupId:params.groupId}),
    };
},GroupPage)
