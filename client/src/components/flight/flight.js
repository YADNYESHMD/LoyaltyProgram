import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import moment from "moment";

import "./flight.css";
import Alert from "../UI/SnackBar/SnackBar";
import Table from "../UI/Table/Table"

import axios from "axios";

import Modal from "../UI/Modal/Modal";
import { Button } from "@mui/material";

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination_name: "",
      destination_price: null,
      flight_class_name: "",
      flight_class_price: null,
      passengers_name: "",
      passengers_price: null,
      source_name: "",
      source_price: null,
      flightDate: new Date(),
      total_price: 0,
      rewards: 0,
      myFlights: [],
      latestFlights: [],
      airports: [
        {
          value: 4000,
          name: 'Pune International Airport (PNQ), Pune'
        },
        {
          value: 5000,
          name: 'Indira Gandhi Internation Airport (DEL), Delhi'
        },
        {
          value: 6000,
          name: 'Kempegowda International Airport (BLR), Bangalore'
        },
        {
          value: 7000,
          name: 'Port Blair Airport (IXZ), Andaman'
        },
        {
          value: 10000,
          name: 'Tribhuvan International Airport (KTM), Nepal'
        }
      ],
      flightDetails: [
        {
          name: "PuneToDelhi",
          distance: "1173",
          duration: "2 Hrs 13 Mins",
          pune: "06:15",
          delhi: "08:28"
        },
        {
          name: "puneToBangalore",
          distance: "720",
          duration: "2 Hrs 40 Mins",
          pune: "10:00",
          delhi: "12:40"
        },
        {
          name: "PuneToAndaman",
          distance: "2152",
          duration: "9 Hrs 05 Mins",
          pune: "22:30",
          delhi: "07:35"
        },
        {
          name: "PuneToNepal",
          distance: "1492",
          duration: "7 Hrs 20 Mins",
          pune: "08:40",
          delhi: "16:15"
        },
      ],
      flightClass: [
        {
          value: 1000,
          name: 'Economy',
        },
        {
          value: 4000,
          name: 'Premium',
        },
        {
          value: 8000,
          name: 'Business',
        },
      ],
      loading: false,
      headers: [
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
      open: false
    };
  }

  componentDidMount = async () => {
    await this.getFlightBookings();
  };

  changeHandler = (event) => {
    this.setState(
      { [event.target.name + "_price"]: parseInt(event.target.value) },
    );
    var id = event.nativeEvent.target.selectedIndex;
    this.setState(
      {
        [event.target.name + "_name"]: event.nativeEvent.target[id].text,
      },
    );
    setTimeout(() => {
      this.updateTotalFare()
    }, 1)
  };


  updateTotalFare = () => {
    if(this.state.source_name === this.state.destination_name) {
      Alert.error('Source & destination cannot be the same')
      this.setState({
        total_price: 0,
        rewards: 0
      })
    }
    if(
      this.state.destination_name !== '' 
      && this.state.destination_price !== ''
      && this.state.source_name !== ''
      && this.state.source_price !== ''
      && this.state.flight_class_name !== ''
      && this.state.flight_class_price !== ''
      && this.state.passengers_name !== ''
      && this.state.passengers_price !== ''
      && this.state.flightDate !== ''
      && this.state.source_name !== this.state.destination_name
    ) {
      let price = (this.state.source_price + this.state.destination_price + this.state.flight_class_price) * this.state.passengers_price
      let rewards = price / 10
      this.setState({
        total_price: price,
        rewards: rewards
      })
    }
  }

  bookFlight = async (total_price, rewards) => {
    this.props.bookFlight(total_price);

    const payload = {
      account_address: this.props.account,
      destination_name: this.state.destination_name,
      destination_price: this.state.destination_price,
      flight_class_name: this.state.flight_class_name,
      flight_class_price: this.state.flight_class_price,
      passengers_name: this.state.passengers_name,
      passengers_price: this.state.passengers_price,
      source_name: this.state.source_name,
      source_price: this.state.source_price,
      flightDate: this.state.flightDate,
      totalPrice: total_price,
      loyaltyRewards: rewards,
    };

    try {
      this.setState({loading: true})
      await axios({
        url: "http://localhost:9002/flight/booking",
        method: "POST",
        data: payload,
      })
      .then(() => {
        Alert.success('Flight booking successful!')
        this.setState({open: false})
        this.getFlightBookings();
      }) 
    } catch (error) {
      Alert.error(error) 
    }
    this.setState({loading: false})
  };

  getFlightBookings = () => {
    axios
      .get("http://localhost:9002/flight/my-booking") //params
      .then((response) => {
        const data = response.data;
        const previousFlights = data.filter(flight => moment(flight.flightDate).isBefore(new Date()));
        this.setState({ myFlights: previousFlights });
        const latestFlights = data.filter(flight => moment(flight.flightDate).isAfter(new Date()))
        this.setState({ latestFlights: latestFlights })
      })
      .catch(() => {
        console.log("Error retrieving data!");
      });
  };

  handleClose() {
    this.setState({open: false})
  }

  render() {
    return (
      <section id="flight" className="flight-container">
        <div className="page-title__flight">Flight Booking</div>
        <div class="booking-row__flight">
          <form>
            <div class="booking-row-internal__flight">
              <div class="form-fields">
                <p class="booking-title__flight">Source</p>
                <select
                  name="source"
                  className="form-select"
                  id="source"
                  aria-label=".form-select source-city"
                  onChange={this.changeHandler}
                >
                  <option value="0" selected disabled hidden>
                    Select your source
                  </option>
                  {this.state.airports.map((item, index) => {
                    return (
                      <option value={item.value} name={item.name} key={index}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="form-fields">
                <p className="booking-title__flight">Destination</p>
                <select
                  name="destination"
                  className="form-select"
                  id="destination"
                  aria-label=".form-select destination"
                  onChange={this.changeHandler}
                >
                  <option value={null} selected hidden disabled>
                    Select your destination
                  </option>
                  {this.state.airports.map((item, index) => {
                    return (
                      <option value={item.value} name={item.name} key={index}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="booking-row-internal__flight">
              <div className="form-fields">
                  <p className="booking-title__flight">Flight Class</p>
                  <select
                    name="flight_class"
                    className="form-floating form-select"
                    id="class"
                    aria-label=".form-select flight-class"
                    onChange={this.changeHandler}
                  >
                    <option value={null} selected hidden disabled>
                      Select your flight class
                    </option>
                    {this.state.flightClass.map((item, index) => {
                      return (
                        <option value={item.value} name={item.name} key={index}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              <div className="form-fields">
                <p className="booking-title__flight">Journey Date</p>
                <DatePicker
                  className="datePicker"
                  selected={this.state.flightDate}
                  dateFormat="dd/MM/yyyy"
                  minDate={subDays(new Date(), 0)}
                  onChange={(date) => {
                    this.setState({
                      flightDate: date,
                    });
                  }}
                />
              </div>
              <div className="form-fields">
                <p className="booking-title__flight">Number of Passengers</p>
                <select
                  name="passengers"
                  className="form-select"
                  id="passengers"
                  aria-label=".form-select passengers"
                  onChange={this.changeHandler}
                >
                  <option value="0" selected hidden disabled>
                    Select number of seats
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="">
              <Button
                variant="contained"
                name="Book Flight"
                className="book-flight-btn"
                onClick={()=>{this.setState({open:true})}}
                disabled={this.state.total_price === 0}
              >
                Get Fare
              </Button>
            </div>
          </form>
        </div>
        <div>
          <Table type='flight' headers={this.state.headers} items={this.state.latestFlights} heading="Upcoming Flights" />
        </div>
        <div>
          <Table type='flight' headers={this.state.headers} items={this.state.myFlights} heading="Booking History" />
        </div>
        <Modal
          title="Flight Fare"
          type="flight"
          handleClose={this.handleClose.bind(this)}
          open={this.state.open}
          totalPrice={this.state.total_price} 
          rewards_used={0}
          rewards={this.state.rewards}
          onClick={this.bookFlight.bind(this)} //bookFlight contract function must be written in LoggedIn.js
        />
      </section>
    );
  }
}

export default Flight;
