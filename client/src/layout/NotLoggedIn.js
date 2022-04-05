import React from "react";
import { Route } from "react-router-dom";

import Home from "../components/home/home";

class NotLoggedIn extends React.Component {
	render() {
		return (
			<Route exact path='/'>
				<Home setLoggedIn={this.props.setLoggedIn}/>
			</Route>
		)
	}
}

export default NotLoggedIn;