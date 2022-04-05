import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import Flight from "./components/flight/flight";
import Hotel from "./components/hotel/hotel";

import LoggedIn from "./layout/LoggedIn";
import NotLoggedIn from "./layout/NotLoggedIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('loggedIn') === 'true' ? true : false,
    };
  }

  setLoggedIn = () => {
    this.setState({
      loggedIn: true
    });
  };

  setLoggedOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  render() {
    return (
      <div className="App">
        <ToastContainer 
          style={{ alignItems: 'center', fontSize: 'small', width: 'auto', maxHeight: '1em' }}
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <Switch>
            {this.state.loggedIn ? (
              <LoggedIn setLoggedOut={this.setLoggedOut.bind(this)}>
                <Route to='/dashboard' component={Dashboard} />
                <Route to='/flight' component={Flight} />
                <Route to='/hotel' component={Hotel} />
              </LoggedIn>
            ) : (
              <NotLoggedIn setLoggedIn={this.setLoggedIn.bind(this)} />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
