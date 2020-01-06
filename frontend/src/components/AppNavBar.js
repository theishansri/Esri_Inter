import React, { Component } from 'react'
import { Container, NavLink, Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap'

export class AppNavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Items</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink>Register</NavLink>
                        </NavItem>
                        <NavItem><NavLink>Login</NavLink></NavItem>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        )
    }
}

export default AppNavBar



