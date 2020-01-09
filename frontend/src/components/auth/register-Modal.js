import React, { Component } from 'react'
import { Container,Alert, NavLink,Input, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Button } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../../actions/authActions";
import {clearErrors} from "../../actions/errorActions"
export class registers extends Component {
    state={
        modal:false,
        firstName:'',
        lastName:'',
        password:'',
        msg:null,
        email:''
    }
    handleChange=(e)=>{
        this.setState(
            {
                [e.target.name]:e.target.value
            }
        )
    }
    componentDidUpdate(prevProps){
        const {error}=this.props;
        if(error!==prevProps.error){
            //Check for register error
            if(error.id==='REGISTER_FAIL'){
                this.setState({
                    msg:error.msg.msg
                })
            }
            else{
                this.setState({
                    msg:null
                })

            }
        }
    }
    static propTypes={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        clearErrors:PropTypes.func.isRequired
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.props.clearErrors()
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {firstName,lastName,password,email}=this.state
        const newUser={
            firstName,lastName,password,email
        }
        this.props.register(newUser);
    }
    render() {
        console.log(this.state.msg)
        return (
            <div>
                <NavLink style={{color:'white'}} className="mt-2" onClick={this.toggle} href='#'>Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                        <Label for="firstName">FirstName</Label>
                        <Input type="text" name="firstName" className="mb-3" id="firstName" placeholder="FirstName" onChange={this.handleChange}/>
                        <Label for="lastName">LastName</Label>
                        <Input type="text" name="lastName" className="mb-3" id="lastName" placeholder="LastName" onChange={this.handleChange}/>
                        <Label for="firstName">Email</Label>
                        <Input type="email" name="email" className="mb-3" id="email" placeholder="Email" onChange={this.handleChange}/>
                        <Label for="password">Password</Label>
                        <Input type="password" className="mb-3" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                        <Button color='dark' style={{marginTop:'2rem'}} block>Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        register:(user)=>dispatch(register(user)),
        clearErrors:()=>dispatch(clearErrors())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(registers)
