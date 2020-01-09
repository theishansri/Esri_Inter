import React, { Component, Fragment } from 'react'
import { Container, NavLink, Navbar, ListGroup, Alert, ListGroupItem, Nav, NavbarBrand, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup } from 'reactstrap';
import "../../node_modules/font-awesome/css/font-awesome.min.css"
import { connect } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import Login from './auth/LoginModal';
import PropTypes from 'prop-types';
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
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { cart, price } = this.props;
        const { isAuthenticated, user } = this.props.auth
        const cart_items = (
            <React.Fragment>
                <ModalHeader toggle={this.toggle}>Your Cart Items</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <ListGroup>
                                {Object.entries(cart).map(([i, index]) => {
                                    return (
                                        <ListGroupItem key={i}><b>ItemName: </b>{i}&nbsp;<span className="ml-5"><b>Quantity: &nbsp;</b></span>{index}
                                            <span className="ml-5"><b>Price:&nbsp;</b>{price[i] * index}</span>
                                        </ListGroupItem >
                                    )
                                })}
                            </ListGroup>
                            <span><Button color="danger" style={{ marginTop: '2rem' }} onClick={this.toggle}>Cancel</Button>
                                <Button color="primary" className="ml-2" style={{ marginTop: '2rem' }}>Procced</Button></span>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </React.Fragment>
        )
        const empty_cart = (
            <React.Fragment>
                <ModalHeader>Cart is Empty</ModalHeader>
                <Alert color="danger" className="mt-3" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>Please Add Items to Your Cart</Alert>
            </React.Fragment>
        )
        const logout = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : null}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
        const login = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <Login />
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Items</NavbarBrand>
                        <Nav>
                            {isAuthenticated ? logout : login}


                            <NavItem>
                                <NavLink className="link-color" style={{ color: 'white' }}><i className="fa fa-shopping-cart"></i></NavLink>
                            </NavItem>

                        </Nav>
                    </Container>
                </Navbar>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    {Object.keys(cart).length > 0 ? cart_items : empty_cart}
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.items.items,
        price: state.items.cart,
        isAuthenticated: state.auth.isAuthenticated,
        auth: state.auth
    }
}
export default connect(mapStateToProps, null)(AppNavBar)



