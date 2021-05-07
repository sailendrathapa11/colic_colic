import React from 'react';
import "./Navbar.css";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NoteRoundedIcon from '@material-ui/icons/NoteRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import profile from "../images/profile.png";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {useHistory} from "react-router-dom";


  const Navbar = () => {
  let history= useHistory();
  const profileHandler = (e) => {
    e.preventDefault ();
    history.push('/Profile');
  }

  const homepage = (e) =>{
    e.preventDefault();
    history.push("./Homepage");
  }

  return (
    <div className="navbar">
      <div className="nav-section">
          <div className="logo">
            <p>COLIC</p>
          </div>
          <div className="nav-items">
            <a onClick={homepage} href="/#"><HomeRoundedIcon style={{fontSize: 35, color: 'white'}}/></a>
            <a href="/#"><i className="fas fa-comments" style={{fontSize: 35, color: 'white'}}/></a>
            <a href="/#"><NoteRoundedIcon style={{fontSize: 35, color: 'white'}}/></a>
            <a href="/#"><i className="fab fa-blogger-b" style={{fontSize: 35, color: 'white'}}/></a>
            <a href="/#"><SettingsRoundedIcon style={{fontSize: 35, color: 'white'}}/></a>
          </div>
          <div className="profile">
            <img onClick={profileHandler} src={profile} alt=""/>
            <ExitToAppRoundedIcon onClick={()=>{localStorage.clear(); window.location.href = "/Login"}} className="logout" style={{fontSize: 35, color: 'white'}}/>
          </div>
      </div>
    </div>
  )
}
export default Navbar;
