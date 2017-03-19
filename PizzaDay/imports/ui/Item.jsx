import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../api/groups.js';



class Item extends Component{
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
                    <div className="right-menu">
                        <Button>
                            Add to cart
                        </Button> 
                        <Link to={`/group/${this.props.item._id}/updateItem`}>
                                <span className="glyphicon glyphicon-pencil">
                                </span>
                        </Link>
                        <button className="delete" onClick={this.removeThisItem.bind(this)}>
                            &times;
                        </button>
                    </div>
                   : '' }
            </Panel>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};
