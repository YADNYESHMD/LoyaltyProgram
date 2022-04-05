import React, { Component } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import moment from 'moment'

import "./dashboard.css";
import Table from "../UI/Table/Table"

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      account: this.props.account,
      latestFlights: [],
      latestHotels: [],
      flight: 0,
      hotel: 0,
      flightHeaders: [
        {
          name: 'ID',
        },
        {
          name: 'Source',
        },
        {
          name: 'Destination',
        },
        {
          name: 'Flight Class',
        },
        {
          name: 'No. of Passengers',
          align: 'center',
        },
        {
          name: 'Flight Date',
        },
        {
          name: 'Total Fare (₹)',
          align: 'center',
        },
        {
          name: 'Rewards Earned',
          align: 'center',
        },
      ],
      hotelHeaders: [
        {
          name: "ID",
        },
        {
          name: "City",
        },
        {
          name: "Room",
        },
        {
          name: "No. of Rooms",
          align: "center",
        },
        {
          name: "Check-in Date",
        },
        {
          name: "Check-out Date",
        },
        {
          name: "Total Price (₹)",
          align: "center",
        },
        {
          name: "Rewards Used",
          align: "center",
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        account: this.props.account,
        user: this.props.user,
      });
    }
  }

  componentDidMount = () => {
    this.getLatestFlight();
    this.getLatestHotel();
    this.setState({ user: this.props.user });
  };

  getLatestFlight = () => {
    axios
      .get("http://localhost:9002/flight/my-booking") //params
      .then((response) => {
        const data = response.data
        const latestFlights = data.filter(flight => moment(flight.flightDate).isAfter(new Date()))
        this.setState({ latestFlights: latestFlights, flight: data.length })
      })
      .catch(() => {
        console.log("Error retrieving data!");
      });
  };

  getLatestHotel = () => {
    axios
      .get("http://localhost:9002/hotel/my-booking")
      .then((response) => {
        const data = response.data
        const latestHotels = data.filter(hotel => { 
          return moment(hotel.check_in).isAfter(new Date())
        })
        this.setState({ latestHotels: latestHotels, hotel: data.length})
      })
      .catch(() => {
        console.log("Error retrieving data!");
      });
  };

  render() {
    return (
      <section id="dashboard" className="dashboard">
        <div className="dashboard-name">Hello, {this.state.user.name}</div>
        <div className="dashboard-account">
          You are logged in with
          <i class="fas fa-wallet"></i>
          {this.state.account}
        </div>
        <hr />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography className="card-heading" variant="h5">
                  Ether Balance
                </Typography>
                <Typography sx={{ fontSize: 25 }} color="#2c2c2c">
                  <i class="fab fa-ethereum icon"></i>
                  {this.props.ether}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography className="card-heading" variant="h5">
                  Total Bookings
                </Typography>
                <Typography sx={{ fontSize: 22 }} color="#2c2c2c">
                  <AirplanemodeActiveIcon className="icon" />
                  {this.state.flight} flights
                </Typography>
                <Typography sx={{ fontSize: 22 }} color="#2c2c2c">
                  <LocalHotelIcon className="icon" />
                  {this.state.hotel} hotels
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div>
          <Table type='flight' headers={this.state.flightHeaders} items={this.state.latestFlights} heading="Upcoming Flights" />
        </div>
        <div>
          <Table type='hotel' headers={this.state.hotelHeaders} items={this.state.latestHotels} heading="Upcoming Hotel Bookings" />
        </div>
      </section>
    );
  }
}

export default Dashboard;
