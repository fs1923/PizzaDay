import React, { Component } from 'react';
import {Nav,Navbar,NavItem,NavDropdown,MenuItem,Button} from 'react-bootstrap';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';


export default class Menu extends Component{
    render(){
        return (
            //<div>as</div>
            <div>
            <Navbar inverse collapseOnSelect>
                <NavbarHeader>
                    <NavbarBrand>
                        <a href="#">Pizza Day</a>
                    </NavbarBrand>
                    <NavbarToggle />
                </NavbarHeader>
                <NavbarCollapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Main</NavItem>
                        <NavItem eventKey={2} href="#">My Event</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={2} href="#">Login/Logout</NavItem>
                    </Nav>
                </NavbarCollapse>
            </Navbar>
            </div>
            //<div>
            //    <Button bsStyle="primary">Primary</Button>
            //</div>
        );
    }
}