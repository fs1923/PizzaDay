import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { Items } from '../api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import { PanelGroup, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Spinner from './Spinner';
import { Link } from 'react-router';
import Item from '../ui/Item.jsx'

class GroupPage extends Component {
    renderLink() {
        return (<Link to={`/group/${this.props.params.groupId}/request`}>request && members</Link>);
    };
    renderItem(){
        return this.props.items.map((item) => (
            <Item key={item._id} item={item} />
        ));
    }
    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1>{this.props.groupPage.name}</h1>
                    </div>
                    <div className="col-md-2">
                       {(this.props.groupPage.mainUser === Meteor.userId()) ? <Button bsStyle="link">{this.renderLink()}</Button> : ''}
                    </div>
                </div>
                <div>
                    {(this.props.groupPage.mainUser === Meteor.userId()) ?<Link className="btn btn-success" to={`/group/${this.props.groupPage._id}/insertItem`}>Add item</Link> : '' }
                </div>
                <h1>Items</h1>
                <PanelGroup>
                    {this.renderItem()}
                </PanelGroup>
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
    return {
        loading: !groupsSubs.ready() && !userSubs.ready() && !itemSubs.ready(),
        groupPage: Groups.findOne({_id:params.groupId}),
        items: Items.find({group:params.groupId}).fetch(),
    };
},GroupPage)
