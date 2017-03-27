import React, { Component, PropTypes } from  'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Shopping } from '../api/shopping.js';
import PurchaseUser from './purchaseUser.jsx';
import { Table, Grid } from 'react-bootstrap';
import Spinner from './Spinner.jsx';

class usersShoppingStory extends Component {
	renderUsersShoppingStory() {
		return this.props.shopping.map((purchase) => (
			<PurchaseUser key={purchase._id} purchase={purchase} />
		));
	};
	render() {
		if (this.props.loading){
			return <Spinner/>;
		}
		return (
			<Grid>
			{ this.props.checkStory ?
				<Table responsive>
                	<thead>
                    	<tr>
                        	<th>#</th>
                        	<th>Username</th>
                        	<th>Item name</th>
                        	<th>Quantity item</th>
                        	<th>Price item</th>
                        	<th>Purchase amount</th>
                    	</tr>
               		</thead>
                	<tbody>
                    	{this.renderUsersShoppingStory()}
                	</tbody>
            	</Table>
            	: <span><h1>History is empty</h1></span>
            }
            </Grid>
		);
	}
}
usersShoppingStory.propTypes = {
	shopping: PropTypes.array.isRequired,
};
export default createContainer(() => {
	const shoppingSubs = Meteor.subscribe('shopping');
	return {
		loading: !shoppingSubs.ready(),
		shopping: Shopping.find({userId: Meteor.userId()}).fetch(),
		checkStory: Shopping.findOne({userId: Meteor.userId()}),
	};
},usersShoppingStory)