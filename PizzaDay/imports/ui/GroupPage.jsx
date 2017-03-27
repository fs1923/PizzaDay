import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { Items } from '../api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import { PanelGroup, FormGroup, FormControl, Button, ControlLabel, Col, Table, Row, Thumbnail, Grid, Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Spinner from './Spinner';
import { Link } from 'react-router';
import Item from '../ui/Item.jsx';
import { Cart } from '../api/cart.js';
import RenderCart from './RenderCart';
import { UserList } from '../api/userList.js';


class GroupPage extends Component {
    renderItem(){
        return this.props.items.map((item) => (
            <Item key={item._id} item={item} userListCheck={ UserList.findOne({UserId: Meteor.userId(), groupId:this.props.params.groupId, status:"Follow"}) } mainUser={this.props.groupPage.mainUser === Meteor.userId()} />
        ));
    };
    renderCart(){
        return this.props.cart.map((cart) => (
            <RenderCart key={cart._id} cart={cart}/>
        ));
    };
    sum(){
        s = 0;
        this.props.cart.forEach(function(cart, i, arr) {
            s+=cart.Quantity*Items.findOne({_id:cart.ItemId}).prise;
        });
        return s;
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
            Meteor.call('CartAll.remove', Meteor.userId());
        }
    };
    byCart(){
        let beforBuyItem = confirm(`You buy on sum:` + this.sum()+"$");
        if ( beforBuyItem ) {
            let shopping = { items: [], userId: Meteor.userId(), groupId: this.props.params.groupId, priceSum: this.sum()} ;
            this.props.cart.forEach(function(cart, i, arr) {
                shopping.items.push({ name: Items.findOne({_id:cart.ItemId}).name, quantity: cart.Quantity, price: Items.findOne({_id:cart.ItemId}).prise });
            });
            Meteor.call('Insert.Shopping', shopping);
            Meteor.call('CartAll.remove', Meteor.userId());
        }
    };
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div>
            <div className="container-fluid">
                <div className="row image-change margin-top">
                    <img height="350px" width="100%" src={`${this.props.groupPage.url}`} className="responsive" />
                </div>
                <Row>
                    <Navbar className="menu-under-image">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <span>{this.props.groupPage.name}</span>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        {(this.props.groupPage.mainUser === Meteor.userId()) ?
                            <Nav pullRight className="right-menu">
                                <NavItem eventKey={1}><Link to={`/group/${this.props.params.groupId}/request`}>Request && Members</Link></NavItem>
                                <NavItem eventKey={1}><Link to={`/group/${this.props.params.groupId}/insertCoupon`}>Add Coupon</Link></NavItem>
                                <NavDropdown eventKey={2} title="Options group" id="basic-nav-dropdown">
                                    <MenuItem eventKey={2.1} ><Link to={`/updateGroup/${this.props.params.groupId}`}>Edit Group</Link></MenuItem>
                                    <MenuItem divider />
                                    <MenuItem onClick={this.deleteThisGroup.bind(this)} eventKey={2.2} >Remove Group</MenuItem>
                                </NavDropdown>
                            </Nav>
                            :
                            ''
                        }
                        </Navbar.Collapse>
                    </Navbar>

                </Row>
            </div>
            <div className="container">   
                <Row>
                    <Col xs={12} md={8}>
                        <h1 className="text-item-title">Items</h1>
                        {(this.props.groupPage.mainUser === Meteor.userId()) ?
                            <Link className="btn btn-info  button-margin" to={`/group/${this.props.groupPage._id}/insertItem`}>Add item</Link>
                            :
                            ''
                        }
                    </Col>
                    {this.props.cartCheck ?
                        <Col xs={6} md={4}>
                            <h1>Cart</h1>
                        </Col> : ''}
                </Row>
                <Row>
                    {this.props.cartCheck ?
                        <Col xs={12} md={8}>
                            {this.renderItem()}
                        </Col> : 
                            this.renderItem()
                    }
                    {this.props.cartCheck ?
                    <Col xs={12} md={4}>
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
                                <tr>
                                    <td><button className="button-cart" onClick={this.byCart.bind(this)}>Buy</button></td>
                                    <td>{this.sum()+"$"}</td>
                                    <td></td>
                                    <td> <button className="button-cart" onClick={this.removeCart.bind(this)}>Remove</button> </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    : ''}
                </Row>
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
    const userListSubs = Meteor.subscribe('userList');
    return {
        loading: !groupsSubs.ready() && !userSubs.ready() && !itemSubs.ready() && !cartSubs.ready() && !userListSubs.ready(),
        groupPage: Groups.findOne({_id:params.groupId}),
        items: Items.find({group:params.groupId}).fetch(),
        cart: Cart.find({UserId:Meteor.userId(),GroupId:params.groupId}).fetch(),
        cartCheck: Cart.findOne({UserId:Meteor.userId(),GroupId:params.groupId}),
    };
},GroupPage)
