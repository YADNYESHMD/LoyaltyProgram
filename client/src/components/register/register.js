import React, { useState } from "react";
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Alert from "../UI/SnackBar/SnackBar";

const Register = (props) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    try {
      setLoading(true)
      if (user.name && user.email && user.password && user.password === user.reEnterPassword) {
        await axios.post("http://localhost:9002/register", user).then((res) => {
          Alert.success('Registered successfully!')
          props.updatePage('login')
        });
      }
    } catch (error) {
      Alert.error(error)
    }
    setLoading(false)
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      <div className="button-row space-between">
        <Button onClick={props.updatePage} className="login-btn" variant="outlined">Cancel</Button>
        <LoadingButton
          onClick={register}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Register
        </LoadingButton>
      </div>
    </div>
  );
};

export default Register;
