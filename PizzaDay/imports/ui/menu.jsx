import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '../startup/accounts-config.jsx';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';


class Menu extends Component {
    render() {


        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Pizza Day</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1}><Link to="/">Main</Link></NavItem>
                            {this.props.currentUser ? <NavItem eventKey={2}><Link to="/usersShoppingStory">Shopping story</Link></NavItem> : ''}
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title={this.props.currentUser ? Meteor.user().username : "Login/Registr"} id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} header ><Accounts.ui.LoginForm /></MenuItem>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        );
    }
}
export default createContainer(() => {
   return {
       currentUser: Meteor.user(),
   };
},Menu);