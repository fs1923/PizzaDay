import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups.js';
import { Items } from '../api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import { PanelGroup, FormGroup, FormControl, Button, ControlLabel, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Spinner from './Spinner';
import { Link } from 'react-router';
import Item from '../ui/Item.jsx'

class GroupPage extends Component {
    renderItem(){
        return this.props.items.map((item) => (
            <Item key={item._id} item={item} />
        ));
    };
    deleteThisGroup() {
        let beforDeleteGroups = confirm('Are you sure?');
        if ( beforDeleteGroups === true ) {
            Meteor.call('Groups.remove', this.props.params.groupId, Meteor.user() );
        };
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
