import React, { Component, PropTypes } from 'react';
import Spinner from '../../Spinner.jsx';
import  { Shopping } from '../../../api/shopping.js';
import ShoppingHistory from './shoppingHistory.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Table, Grid } from 'react-bootstrap';

class ShoppingGroupsStory extends Component {

renderShoppingHistory() {
        return this.props.shopping.map((purchase) => (
            <ShoppingHistory key={purchase._id} purchase={purchase} />
        ));
    };
    render(){
    	if (this.props.loading) {
    		return <Spinner />
    	}
    	return(
    		<Grid>
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
                    	{this.renderShoppingHistory()}
                	</tbody>
            	</Table>
            </Grid>
    	);
    }

}

ShoppingGroupsStory.propTypes={
	shopping: PropTypes.array.isRequired,
};
export default createContainer(({params}) => {
    const userSubs = Meteor.subscribe('users');
    const shoppingSubs = Meteor.subscribe('shopping');
    return {
        loading: !userSubs.ready() && !shoppingSubs.ready(),
        shopping: Shopping.find({groupId: params.groupId}).fetch(),
    };
}, ShoppingGroupsStory);
