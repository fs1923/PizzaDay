import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Table } from 'react-bootstrap';
import { Coupons } from '../../api/coupons';
import Spinner from '../Spinner';
import { Link } from 'react-router';
import RenderCoupon from './RenderCoupon.jsx';



class CouponsPage extends Component{
    renderCoupon(){
        return this.props.coupons.map((coupon) => (
            <RenderCoupon key={coupon._id} coupon={coupon} />
        ));
    }
    render(){
        if (this.props.loading) {
            return <Spinner/>;
        }
        return(
            <div className="container">
                <Link to={`/group/${this.props.params.groupId}/insertCoupon`} className="btn btn-primary">Add Coupon</Link>
                <h1>Coupons</h1>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Day</th>
                        <th>Quantity</th>
                        <th>Persent</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderCoupon()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
CouponsPage.propTypes = {
    coupons: PropTypes.array.isRequired,
};
export default createContainer((params) => {
    const groupSubs = Meteor.subscribe('groups');
    const couponsSubs = Meteor.subscribe('coupons');
    const itemSubs = Meteor.subscribe('items');
    const userSubs = Meteor.subscribe('users');
    return {
        loading: !couponsSubs.ready() && !userSubs.ready() && !itemSubs.ready() && !groupSubs.ready(),
        coupons: Coupons.find({}).fetch(),
    };
}, CouponsPage);