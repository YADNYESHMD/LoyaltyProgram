import React from "react";
import { Link } from "react-router-dom";
// import AccountAddress from "../AccountAddress/AccountAddress";

import "./navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">SF Tours</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    // aria-current="flight"
                    to="/flight"
                  >
                    <i className="fas fa-plane"></i> Flight
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                  className="nav-link" 
                  to="/hotel">
                    <i className="fas fa-hotel"></i> Hotel
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <AccountAddress account={this.props.account} className="navbar-address"/>
                </li> */}
                <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/login">
                <i className="fas fa-user"></i> Account
                </Link>
                </li>

              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
