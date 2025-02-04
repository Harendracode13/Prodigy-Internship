import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import MainContainer from "./components/MainContainer/MainContainer";
import Welcome from "./components/Welcome/Welcome";
import AvailableUsers from "./components/AvailableUsers/AvailableUsers";
import ChatArea from "./components/ChatArea/ChatArea";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="users" element={<AvailableUsers />} />
          <Route path="chat-area" element={<ChatArea />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
