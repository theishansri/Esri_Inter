import React, { Component } from 'react'
import {  NavLink, Alert, Input,  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
class RegisterModal extends Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        msg: null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    };
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === "REGISTER_FAIL") {
                this.setState({
                    msg: error.msg.msg
                })
            }
            else {
                this.setState({ msg: null })
            }
        }
        if (this.state.modal && isAuthenticated) {
            this.toggle();
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state
        const newUser = {
            firstName,
            lastName,
            email,
            password
        }
        this.props.register(newUser);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <NavLink style={{ color: 'white' }} onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="firstName">FirstName</Label>
                                <Input className="mb-3" type="text" name="firstName" id="firstName" placeholder="FirstName" onChange={this.handleChange} />
                                <Label for="lastName">LastName</Label>
                                <Input className="mb-3" type="text" name="lastName" id="lastName" placeholder="LastName" onChange={this.handleChange} />
                                <Label for="email">Email</Label>
                                <Input className="mb-3" type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                                <Label for="email">Password</Label>
                                <Input className="mb-3" type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
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
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(register(user)),
        clearErrors: () => dispatch(clearErrors())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
