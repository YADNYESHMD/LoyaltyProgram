import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Alert from "../UI/SnackBar/SnackBar";

const Login = (props) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      setLoading(true)
      axios.post("http://localhost:9002/login", user).then((res) => {
        if(res.data.status !== 403) {
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          props.setLoggedIn()
          history.push('/dashboard');
        } else {
          Alert.error('Login failed')
        }
      });
    } catch (error) {
      Alert.error(error)
    }
    setLoading(false)
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      <div className="button-row space-between">
        <Button onClick={props.updatePage} className="login-btn" variant="outlined">Cancel</Button>
        <LoadingButton
          onClick={login}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Login
        </LoadingButton>
      </div>
    </div>
  );
};

export default Login;
