import React, {useState} from 'react';
import "../auth/Login.css";
import colic from "../../images/colic-baby.png";
import colicc from "../../images/balloon.png";
import google from "../../images/google-logo.png";
import facebook from "../../images/facebook-logo.png";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { url, tokenName } from '../constant';
// import GoogleLogin from 'react-google-login';



const Login = (props) => {
  let history = useHistory();
  
  const [signupLogin, setSignupLogin] = useState(false);
  
  // const responseGoogle = (response) => {
  //   console.log(response);
  // }

  const [login, setLogin] = useState ({email: '', password: ''});
  const [signup, setSignup] = useState ({username: '', email: '', password: '', confirmPassword: '', is_subscribe: true});

  const logHandler = (e)=> {
    const {value, name} = e.target
    let logged = login
    logged[name] = value
    setLogin({...logged})             
    // console.log(e.target.value);
  }
  const loginHandler=(e) => {
    // console.log(login);
    e.preventDefault ();
    axios.post(`${url}/auth/login`, login)
    .then(res =>{
      // console.log(res);
      window.location.href = "/Homepage";
      localStorage.setItem(tokenName, `Bearer ${res.data.token}`);
    }).catch(e => {
        // console.log(e);
    }) 
}

const inputHandler = (e)=> {
  const {value, name} = e.target
  let signed = signup
  signed[name] = value
  setSignup({...signed})
  // console.log(e.target.value);
}

const signupHandler=(e) => {
  // console.log(signup);
  e.preventDefault ();
  axios.post(`${url}/auth/register`, signup)
  .then(res =>{
    // console.log(res);
    history.push('/OTP')
  }).catch(e => {
      // console.log(e);
  }) 
}


  return (
  <div className="login">
    {/* <GoogleLogin
    clientId="187633976016-rlfu7ju2jbi4nc5vnktqe184ju3v82av.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />, */}
    <div className="header-section">
      <h1>COLIC</h1>
      <div className="images">
      <img className="baby" src={colic} alt=""/>
      <img className="balloon" src={colicc} alt=""/>
      </div>
    </div>
    {signupLogin===false?
    <form className="form" onSubmit={(e)=> loginHandler(e)}>
    <h2>Login</h2>
    <div className="login-detail">
      <label className="username" htmlFor="username">Username</label>
      <input autoComplete="off" type="text" className='username-input' name='email' id="int-username" value={login.email} onChange= {(e)=>logHandler(e)}/>
      <label className="password" htmlFor="pasword">Password</label>
      <input type="password" className='password-input' name='password' id="int-password" value={login.password} onChange= {(e)=>logHandler(e)}/>
      <a href="/#" >Forgot Password?</a>
    </div>
    <button className="login-btn">Login</button>
    <div className="rigester">
      <p>Don't have an account?</p>
      <div type="button" className="rigester-link" href=""onClick={() => setSignupLogin(true)}>Register</div>
    </div>
    <div className="or-section">
      <hr/>
      <p>OR</p>
      <hr/>
    </div>
    <button className="google">
      <img src={google} alt="google-log"/>
      <p>Continue with Google</p>
      <i className="fas fa-arrow-right fa-lg"></i>  
    </button>
    <button className="facebook">
      <img src={facebook} alt="facebook-log"/>
      <p>Continue with Facebook</p>
      <i className="fas fa-arrow-right fa-lg"></i>  
    </button>
  </form>:
   <form className="sign-up" onSubmit={(e)=> signupHandler(e)} >
    <p className='signup-heading'>Sign Up</p>
    <div className="signup-detail">
        <label className="username" htmlFor="username">Username</label>
        <input autoComplete="off" className='username-input' id="int-username" type='text' name="username" value={signup.username} onChange= {(e)=>inputHandler(e)}/>
        <label className="email" htmlFor="email">Email</label>
        <input autoComplete="off" className='email-input' id="int-email" type='text' name="email" value={signup.email} onChange= {(e)=>inputHandler(e)} />
        <label className="password2" htmlFor="pasword">Password</label>
        <input className='password-input' id="int-password" type='password' name="password" value={signup.password} onChange= {(e)=>inputHandler(e)}/>
        <label className="confirm-password" htmlFor="confirmPasword">Confirm Password</label>
        <input type="password" className='confirmPassword-input' id="int-ConfirmPassword" name="confirmPassword" value={signup.confirmPassword} onChange= {(e)=>inputHandler(e)}/>
    </div>
    <div className="terms-condition">
      <input type="checkbox" className="checkbox" />
      <p>By Signing up you agree to our <a href="/#">Terms and Conditions</a></p>
    </div>
    <div className="subscribe">
      <input type="checkbox" className="checkbox" />
      <p>Subscribe to our Newsletter and receive update on news and events.</p>
    </div>
    <button className="signup-btn">Sign Up</button>
    <div className="or2-section">
      <hr/>
      <p>OR</p>
      <hr/>
    </div>
    <button className="google">
      <img src={google} alt="google-log"/>
      <p>Continue with Google</p>
      <i className="fas fa-arrow-right fa-lg"></i>  
    </button>
    <button className="facebook">
      <img src={facebook} alt="facebook-log"/>
      <p>Continue with Facebook</p>
      <i className="fas fa-arrow-right fa-lg"></i>  
    </button>

 </form>}
    
   
  </div>
  )
}
export default Login;
