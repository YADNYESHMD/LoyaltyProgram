import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/loyalty",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

// User Registration
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Flight Booking
const FlightSchema  = new mongoose.Schema({
  account_address: String,
  destination_name: String,
  destination_price: Number,
  flight_class_name: String,
  flight_class_price: Number,
  passengers_name: String,
  passengers_price: Number,
  source_name: String,
  source_price: Number,
  flightDate: Date,
  totalPrice: Number,
  loyaltyRewards: Number
})

const FlightBooking = new mongoose.model("Flight Booking", FlightSchema);

app.get('/flight/my-booking', (req, res) => {

  FlightBooking.find({})
  .then((data) => {
    // console.log("Data: ", data);
    res.json(data);
  })
  .catch((error) => {
    console.log("error: ", error);
  });
});

app.post('/flight/booking', (req, res) => {

  const data = req.body;
  const newFlightBooking = new FlightBooking(data);

  newFlightBooking.save((error) => {
    if(error) {
      res.status(500).json({ msg: "Something went wrong!" })
    }
    else {
      res.json({ msg: "You data has been saved!"})
    }
  })
})

// Hotel Booking
const HotelSchema  = new mongoose.Schema({
  account_address: String,
  hotel_city_name: String,
  hotel_city_price: Number,
  room_class_name: String,
  room_class_price: Number,
  rooms_price: Number,
  check_in: String,
  check_out: String,
  totalPrice: Number,
  loyaltyRewardsUsed: Number
})

const HotelBooking = new mongoose.model("Hotel Booking", HotelSchema);

app.get('/hotel/my-booking', (req, res) => {

  HotelBooking.find({})
  .then((data) => {
    // console.log("Data: ", data);
    res.json(data);
  })
  .catch((error) => {
    console.log("error: ", error);
  });
});

app.post('/hotel/booking', (req, res) => {

  const data = req.body;
  const newHotelBooking = new HotelBooking(data);

  newHotelBooking.save((error) => {
    if(error) {
      console.log(error)
      // res.status(500).json({ msg: "Something went wrong!" })
    }
    else {
      res.json({ msg: "You data has been saved!"})
    }
  })
})

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ status: 403, message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("Database started at port 9002");
});
