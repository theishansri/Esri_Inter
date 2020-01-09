import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authActions'
 class Logout extends Component {
     static propTypes={
         logout:PropTypes.func.isRequired
     }
    render() {
        
        return (
            <Fragment>
                <NavLink style={{color:'white'}} href="#" onClick={this.props.logout}>Logout</NavLink>
            </Fragment>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>dispatch(logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout)
