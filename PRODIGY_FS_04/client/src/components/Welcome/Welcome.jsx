import React from "react";
import "./Welcome.css";
import Img from "../../assets/live-chat.png";

const Welcome = () => {
  return (
    <div className="welcome">
      <img src={Img} alt="logo" />
      <h1>Welcome to our live chat app!</h1>
      <p>
        Connect with your friends, family, or colleagues through our interactive
        chat interface . Send messages, receive notifications, and access
        real-time updates .
      </p>
    </div>
  );
};

export default Welcome;
