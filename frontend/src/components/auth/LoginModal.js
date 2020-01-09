import React, { Component } from 'react'
import { NavLink, Alert, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
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
            if (error.id === "LOGIN_FAIL") {
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
        const { email, password } = this.state
        const newUser = {
            email,
            password
        }
        this.props.login(newUser);
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
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input className="mb-3" type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                                <Label for="email">Password</Label>
                                <Input className="mb-3" type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>Login</Button>
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
        login: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
