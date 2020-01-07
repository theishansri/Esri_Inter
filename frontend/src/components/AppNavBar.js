import React, { Component } from 'react'
import { Container, NavLink, Navbar, ListGroup, ListGroupItem, Nav, NavbarBrand, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import "../../node_modules/font-awesome/css/font-awesome.min.css"
import { connect } from 'react-redux';
class AppNavBar extends Component {
    state = {
        modal: false,
        name: ''
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };
    render() {
        const { cart } = this.props;
        console.log(cart)
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Items</NavbarBrand>
                        <Nav>
                            <NavItem>
                                <NavLink className="link-color" style={{ color: 'white' }}><Button onClick={this.toggle} size="md"><i className="fa fa-shopping-cart"></i></Button></NavLink>
                            </NavItem>
                            <NavItem><NavLink className="link-color" style={{ color: 'white' }}><Button size="md">Login</Button></NavLink></NavItem>
                        </Nav>
                    </Container>
                </Navbar>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Your Cart Items</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <ListGroup>
                                    {Object.entries(cart).map(([i, index]) => {
                                        return (
                                            <ListGroupItem key={i}>{i}&nbsp;<span className="ml-5">Quantity: &nbsp;</span>{index}
                                            <span className="ml-3">Price:</span>
                                            </ListGroupItem >
                                        )
                                    })}
                                </ListGroup>
                                <span><Button color="danger" style={{ marginTop: '2rem' }} onClick={this.toggle}>Cancel</Button>
                                    <Button color="primary" className="ml-2" style={{ marginTop: '2rem' }}>Procced</Button></span>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.items.items
    }
}
export default connect(mapStateToProps, null)(AppNavBar)



