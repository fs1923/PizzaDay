import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import '../startup/accounts-config.jsx';


export default class Menu extends Component {
    render() {


        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Pizza Day</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">Main</NavItem>
                            <NavItem eventKey={2} href="#">My Event</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title="Login/Logout" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} header ><Accounts.ui.LoginForm /></MenuItem>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        );
    }
}
