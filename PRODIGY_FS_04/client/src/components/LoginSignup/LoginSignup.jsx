import React, { useState } from "react";
import "./LoginSignup.css";
import LiveImg from "../../assets/live-chat.png";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/UserSlice";

const LoginSignup = () => {
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUsername = (e) => {
    setUserDetails({ ...userDetails, username: e.target.value });
  };

  const handleEmail = (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
  };

  const handlePassword = (e) => {
    setUserDetails({ ...userDetails, password: e.target.value });
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem("auth-token", responseData.token);
        dispatch(
          setCurrentUser({
            username: responseData.username,
            email: responseData.email,
          })
        );
        navigate("/app/welcome");
        toast.success("Signup Successfully !");
      } else {
        toast.error(responseData.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem("auth-token", responseData.token);
        dispatch(
          setCurrentUser({
            username: responseData.username,
            email: responseData.email,
          })
        );
        navigate("/app/welcome");
        toast.success("Login Successfully !");
      } else {
        toast.error(responseData.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="loginsignup">
      <div className="img-container">
        <img src={LiveImg} alt="Logo" />
      </div>
      <div className="login-signup-container">
        <h1 className="stateh1">{state}</h1>
        <div className="main-login-signup-container">
          {state === "Sign Up" && (
            <TextField
              value={userDetails.username}
              onChange={handleUsername}
              label="Username"
              variant="outlined"
              type="text"
            />
          )}
          <TextField
            value={userDetails.email}
            onChange={handleEmail}
            label="Email"
            variant="outlined"
            type="email"
          />
          <TextField
            value={userDetails.password}
            onChange={handlePassword}
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button
            onClick={() => (state === "Sign Up" ? signup() : login())}
            variant="outlined"
          >
            {state}
          </Button>
          {state === "Sign Up" ? (
            <p id="existp">
              Click here ? <span onClick={() => setState("Login")}>Login</span>
            </p>
          ) : (
            <p id="existp">
              Create an account ?
              <span onClick={() => setState("Sign Up")}>Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
