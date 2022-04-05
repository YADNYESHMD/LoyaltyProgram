import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";

import "./sidebar.css";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: this.props.balance,
    };
  }

  render() {
    return (
      <nav className="sidebar-main">
        <div className="sidebar-top">
          <img src={Logo} alt="logo" className="logo" width={70}/>
          <p className="logo-text__sidebar">Snapper Loyalty</p>
        </div>
        <div className='nav-link-container'>
          <NavLink className="nav-link" exact to={'/dashboard'} activeClassName='is-active'><i class="fas fa-home"></i> Dashboard </NavLink>
          <NavLink className="nav-link" exact to={'/flight'} activeClassName='is-active'><i class="fas fa-plane"></i> Flight </NavLink>
          <NavLink className="nav-link" exact to={'/hotel'} activeClassName='is-active'><i class="fas fa-hotel"></i> Hotel </NavLink>
          <NavLink className="nav-link" exact to={'/support'} activeClassName='is-active'><i class="fas fa-info-circle"></i> Support </NavLink>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
