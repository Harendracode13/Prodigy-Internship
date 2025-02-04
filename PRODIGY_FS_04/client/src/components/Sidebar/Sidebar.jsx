import React from "react";
import "./sidebar.css";
import PeopleIcon from "@mui/icons-material/People";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/ThemeSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Lighttheme = useSelector((state) => state.themekey);

  const logout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className={"allicons" + (Lighttheme ? "" : " dark")}>
        <IconButton onClick={() => navigate("users")}>
          <PeopleIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {Lighttheme ? <NightlightIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton
          onClick={() => {
            logout();
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>
      <div className={"searchbox" + (Lighttheme ? "" : " dark")}>
        <input type="text" placeholder="Search..." />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>

      <div className={"allrecentchats" + (Lighttheme ? "" : " dark")}></div>
    </div>
  );
};

export default Sidebar;
