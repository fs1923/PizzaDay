import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';




export default class Item extends Component{

    render(){
        return (

            <Panel eventKey="1">
                <span>Name item:</span>
                {this.props.item.name}
                <span> Prise: </span>
                {this.props.item.prise}

                <div className="right-menu">
                    <Button>
                        By
                    </Button>
                </div>

            </Panel>
        );
    }
}

Request.propTypes = {
    item: PropTypes.object.isRequired,
};