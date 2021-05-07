import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Login from "./components/auth/Login";
import OTP from "./components/auth/OTP";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Profile from './components/Profile';
import { tokenName } from "./components/constant";
import PrivateRoute from "./components/PrivateRoute";


const App = (props)=> {


  // console.log(localStorage.getItem(tokenName));
  return (
    <Router>    
    {localStorage.getItem(tokenName)? <Navbar/> : null}
    <Switch>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/OTP" component={OTP}/>
      <PrivateRoute exact path='/Homepage' component={Homepage}/>
      <PrivateRoute exact path= '/Profile' component = {Profile}/>
    </Switch>
    </Router>
  );
}

export default App;
