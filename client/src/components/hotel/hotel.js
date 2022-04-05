import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import axios from "axios";
import moment from "moment";

import Alert from "../UI/SnackBar/SnackBar";
import Table from "../UI/Table/Table";

import "./hotel.css";

import Modal from "../UI/Modal/Modal";
import { Button } from "@mui/material";

class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel_city_name: "",
      hotel_city_price: null,
      room_class_name: "",
      room_class_price: null,
      rooms_name: "",
      rooms_price: null,
      hotelCheckInDate: new Date(),
      hotelCheckOutDate: new Date(),
      myHotels: [],
      latestHotels: [],
      cities: [
        {
          name: "Pune",
          value: 2000,
        },
        {
          name: "Delhi",
          value: 4000,
        },
        {
          name: "Bangalore",
          value: 6000,
        },
        {
          name: "Andaman",
          value: 12000,
        },
        {
          name: "Nepal",
          value: 20000,
        },
      ],
      roomTypes: [
        {
          name: "Deluxe Room",
          value: 1500,
        },
        {
          name: "Semi-Luxury",
          value: 1800,
        },
        {
          name: "Business Class Suite",
          value: 10000,
        },
        {
          name: "Penthouse",
          value: 12000,
        },
      ],
      open: false,
      total_price: 0,
      discountedPrice: 0,
      rewards_used: 0,
      discountEnabled: true,
      headers: [
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

  async componentDidMount() {
    await this.getHotelBookings();
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name + "_price"]: parseInt(event.target.value),
    });
    var id = event.nativeEvent.target.selectedIndex;
    this.setState({
      [event.target.name + "_name"]: event.nativeEvent.target[id].text,
    });
    setTimeout(() => {
      this.updateTotalPrice();
    }, 1);
  };

  updateTotalPrice = () => {
    if (
      moment(this.state.hotelCheckOutDate).format("LL") ===
      moment(this.state.hotelCheckInDate).format("LL")
    ) {
      Alert.error("Check-in & Check-out date cannot be the same");
      this.setState({
        total_price: 0,
        rewards_used: 0,
      });
    }
    if (
      this.state.hotel_city_name !== "" &&
      this.state.hotel_city_price !== "" &&
      this.state.room_class_name !== "" &&
      this.state.room_class_price !== "" &&
      this.state.rooms_name !== "" &&
      this.state.rooms_price !== "" &&
      this.state.hotelCheckInDate !== "" &&
      this.state.hotelCheckOutDate !== ""
    ) {
      let actualPrice =
        (this.state.hotel_city_price + this.state.room_class_price) *
        this.state.rooms_price;
      let discount = actualPrice / 100;
      let discountedPrice = actualPrice - discount;
      this.setState({
        total_price: actualPrice,
        discountedPrice: discountedPrice,
        rewards_used: discount,
      });
    }
    console.log(this.state.rewards_used);
  };

  bookHotel = async (total_price, discount, checked) => {
    if (checked) {
      this.props.bookHotel(discount)
    }

    const payload = {
      account_address: this.props.account,
      hotel_city_name: this.state.hotel_city_name,
      hotel_city_price: this.state.hotel_city_price,
      room_class_name: this.state.room_class_name,
      room_class_price: this.state.room_class_price,
      rooms_price: this.state.rooms_price,
      check_in: this.state.hotelCheckInDate,
      check_out: this.state.hotelCheckOutDate,
      totalPrice: total_price,
      loyaltyRewardsUsed: discount,
    };

    axios({
      url: "http://localhost:9002/hotel/booking",
      method: "POST",
      data: payload,
    })
      .then(() => {
        this.setState({ open: false });
        Alert.success("Room(s) booked successfully!");
        this.getHotelBookings();
      })
      .catch(() => {
        console.log("Error in hotel");
      });
  };

  getHotelBookings = () => {
    axios
      .get("http://localhost:9002/hotel/my-booking")
      .then((response) => {
        const data = response.data;
        const previousHotels = data.filter(hotel => moment(hotel.check_in).isBefore(new Date()));
        this.setState({ myHotels: previousHotels });
        const latestHotels = data.filter(hotel => { 
          return moment(hotel.check_in).isAfter(new Date())
        });
        this.setState({ latestHotels: latestHotels });
      })
      .catch(() => {
        console.log("Error retrieving data!");
      });
  };

  handleDiscountChecked = () => {};

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <section id="hotel" className="hotel-container">
        <div className="page-title__hotel">Hotel Booking</div>
        <div className="booking-row__hotel">
          <form>
            <div className="booking-row-internal__hotel">
              <div className="form-fields">
                <p className="booking-title__hotel">Check-in Date</p>
                <DatePicker
                  className="datePicker"
                  selected={this.state.hotelCheckInDate}
                  dateFormat="dd/MM/yyyy"
                  minDate={subDays(new Date(), 0)}
                  onChange={(date) => {
                    this.setState({
                      hotelCheckInDate: date,
                    });
                    setTimeout(() => {
                      this.updateTotalPrice();
                    }, 1);
                  }}
                />
              </div>
              <div className="form-fields">
                <p className="booking-title__hotel">Check-out Date</p>
                <DatePicker
                  className="datePicker"
                  selected={this.state.hotelCheckOutDate}
                  dateFormat="dd/MM/yyyy"
                  minDate={this.state.hotelCheckInDate}
                  onChange={(date) => {
                    this.setState({
                      hotelCheckOutDate: date,
                    });
                    setTimeout(() => {
                      this.updateTotalPrice();
                    }, 1);
                  }}
                />
              </div>
            </div>
            <div className="booking-row-internal__hotel">
              <div className="form-fields">
                <p className="booking-title__hotel">City</p>
                <select
                  name="hotel_city"
                  className="form-select"
                  id="hotel_city"
                  aria-label=".form-select hotel-city"
                  onChange={this.changeHandler}
                >
                  <option selected hidden disabled value={0}>
                    Select your desired city
                  </option>
                  {this.state.cities.map((city, index) => {
                    return <option value={city.value} key={index}>{city.name}</option>;
                  })}
                </select>
              </div>

              <div className="form-fields">
                <p className="booking-title__hotel">Number of Rooms</p>
                <select
                  className="form-floating form-select"
                  id="rooms"
                  name="rooms"
                  aria-label=".form-select room-number"
                  onChange={this.changeHandler}
                >
                  <option selected hidden disabled>
                    Select number of rooms
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="form-fields">
                <p className="booking-title__hotel">Room Type</p>
                <select
                  className="form-floating form-select"
                  id="room_class"
                  name="room_class"
                  aria-label=".form-select room-class"
                  onChange={this.changeHandler}
                >
                  <option value="0" selected hidden disabled>
                    Select your room type
                  </option>
                  {this.state.roomTypes.map((item, index) => {
                    return <option value={item.value} key={index}>{item.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="booking-row-internal__hotel">
              <div>
                <Button
                  variant="contained"
                  name="Book Hotel"
                  className="book-flight-btn"
                  onClick={() => {
                    this.setState({ open: true });
                  }}
                  disabled={this.state.total_price === 0}
                >
                  Get Fare
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <Table
            type="hotel"
            headers={this.state.headers}
            items={this.state.latestHotels}
            heading="Upcoming Hotel Bookings"
          />
        </div>
        <div>
          <Table
            type="hotel"
            headers={this.state.headers}
            items={this.state.myHotels}
            heading="Booking History"
          />
        </div>
        <Modal
          title="Hotel Price"
          type="hotel"
          handleClose={this.handleClose.bind(this)}
          open={this.state.open}
          discountedPrice={this.state.discountedPrice}
          totalPrice={this.state.total_price}
          rewards={this.state.rewards_used}
          rewards_used={this.state.rewards_used}
          onClick={this.bookHotel.bind(this)} //bookHotel contract function must be written in LoggedIn.js
        />
      </section>
    );
  }
}

export default Hotel;
