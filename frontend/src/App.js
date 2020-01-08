import React from 'react';
import AppNavbar from "./components/AppNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Items from './components/Items';
import {loadUser} from "./actions/authActions";
import {connect} from 'react-redux';
class  App extends React.Component {
  componentDidMount(){
    this.props.Load()
  }
  render(){
  return (
    <div className="App">
      <AppNavbar />
      <Items/>  
    </div>
  );
}
}
const mpaDispatchToProps=dispatch=>{
  return{
    Load:()=>dispatch(loadUser())
  }
}
export default connect(null,mpaDispatchToProps)(App);
