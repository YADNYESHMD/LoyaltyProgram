import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../components/dashboard/dashboard";
import Flight from "../components/flight/flight";
import Hotel from "../components/hotel/hotel";
import Sidebar from "../components/sidebar/sidebar";
import TopBar from "../components/UI/TopBar/TopBar"

//Contract import
import Web3 from "web3";

class LoggedIn extends React.Component {
	constructor() {
		super()
		this.state = {
			routes: [
				{
					path: '/dashboard',
					component: Dashboard,
				},
				{
					path: '/flight',
					component: Flight,
				},
				{
					path: '/hotel',
					component: Hotel,
				}
			],
			user: {},
      balance: 0,
      ether: 0,
		}
	}
//contract function call
	//bookflight

  //bookhotel

	componentDidMount = async () => {
    await this.loadUserProfileData();
    await this.loadWeb3();
    await this.loadBlockchainData();
    setTimeout(() => {
      this.balanceOf();
    }, 1000);
    await this.loadEtherBalance();
  };

	loadUserProfileData = async () => {
    const user = localStorage.getItem("user");
    this.setState({
      loggedIn: localStorage.getItem("loggedIn"),
      user: JSON.parse(user)
    });
  };

  loadWeb3 = async () => {
    //for ethereum browser
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      //for legacy browsers
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      //for invalid response
    } else {
      window.alert("Non-ethereum browser detected");
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts(); //load accounts
    this.setState({ account: accounts[0] }); //setting account => store a/c in state obj. in react

    window.ethereum.on(
      "accountsChanged",
      async function () {
        // Time to reload your interface with accounts[0]!
        const accounts = await web3.eth.getAccounts(); //load accounts
        this.setState({ account: accounts[0] }); //setting account => store a/c in state obj. in react
        this.loadEtherBalance();
      }.bind(this)
    );

    //loading contracts
    const networkId = await web3.eth.net.getId();
    const networkData = Loyalty.networks[networkId]; //contract_name to be changed as per contract

    //contract Integation
    // if (networkData) {
    //   const abi = Loyalty.abi;
    //   const address = networkData.address;
    //   const contract = new web3.eth.Contract(abi, address);
    //   this.setState({ contract: contract }); //this.setState({ contract}) //ES6
    // } else {
    //   window.alert("Smart contract not deployed to detected network");
    // }
  };

  loadEtherBalance = () => {
    const web3 = window.web3;
    web3.eth.getBalance(this.state.account, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let ether = web3.utils.fromWei(result, "ether")
        this.setState({ether: ether})
      }
    })
  }

	balanceOf = async () => {
    const balance = await this.state.contract.methods
      .balanceOf(this.state.account)
      .call();
    this.setState({ balance: balance });
  };

	render() {
		return (
			<div>
				<Sidebar
					balance={this.state.balance}
				/>
        <TopBar
					balance={this.state.balance}
          setLoggedOut={this.props.setLoggedOut} />
				<Switch>
					<Route
						exact
						path="/dashboard"
						render={(props) => 
							<Dashboard {...props} user={this.state.user} account={this.state.account} ether={this.state.ether} />
						}
					/>
					<Route
						path='/flight'
						render={(props) => 
							<Flight {...props} bookFlight={this.bookFlight.bind(this)} balanceOf={this.balanceOf.bind(this)} />
						}
          />
          <Route
            path='/hotel'
            render={(props) => 
              <Hotel {...props} bookHotel={this.bookHotel.bind(this)} balanceOf={this.balanceOf.bind(this)} />
            }
          />
				</Switch>
			</div>
		)
	}
}

export default LoggedIn;