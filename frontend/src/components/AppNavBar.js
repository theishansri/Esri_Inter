import React, { Component } from 'react'
import { Container, NavLink, Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';

export class AppNavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Items</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink className="link-color" style={{color:'white'}}>Register</NavLink>
                        </NavItem>
                        <NavItem><NavLink className="link-color" style={{color:'white'}}>Login</NavLink></NavItem>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        )
    }
}

export default AppNavBar



