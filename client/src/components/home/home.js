import { Component } from "react";
import "./home.css";
import Button from '@mui/material/Button';

import Login from '../login/login'
import Register from '../register/register'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: '',
    }
  }

  updatePage(page) {
    this.setState({
      page: page,
    })
  }

  render() {
    return (
      <div className="container__homepage">
        <div className="header-box-overlay__homepage">
          <div className="header-box__homepage">
            <div className="header-primary-text__homepage">
              Welcome to SF Tours!
            </div>
            <div className="header-secondary-text__homepage">
              To continue please login or register
            </div>
            <div className="button-row">
              {this.state.page === 'login' ? (
                <Button onClick={this.updatePage.bind(this, 'register')} variant="contained">Register</Button>
              ) : this.state.page === 'register' ? (
                <Button onClick={this.updatePage.bind(this, 'login')} className="login-btn" variant="contained">Login</Button>
              ) : (
                <div className="button-row" style={{margin: '0'}}>
                  <Button onClick={this.updatePage.bind(this, 'login')} className="login-btn" variant="contained">Login</Button>
                  <Button onClick={this.updatePage.bind(this, 'register')} variant="contained">Register</Button>
                </div>
              )}
            </div>
          </div>
          {
            this.state.page === 'login' ? (
              <Login updatePage={this.updatePage.bind(this, '')} setLoggedIn={this.props.setLoggedIn} />
            ) : this.state.page === 'register' ? (
              <Register updatePage={this.updatePage.bind(this)} />
            ) : (
              <div className="about-us-box__homepage row">
                <div className="about-us-title__homepage">What we do</div>
                <div className="about-us-text__homepage">
                  Snapper tours and travels is dedicated towards giving you the best
                  travel experience! We put in that extra effort to make sure that you
                  have a blast on your travels. We have come up with an innovative
                  technology where we book and store all your records on the 
                  <b> Blockchain</b>. This helps us keep every bit of your information
                  private and safe from the attackers. We provide our users with
                  seamless booking experience. Go ahead and book a flight or a hotel
                  room for your destination. You can get
                  <b> loyalty points</b> when you book a flight and then redeem them
                  for hotel booking in the form of a discount! Refer the below
                  tutorial to know how to use the platform.
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
