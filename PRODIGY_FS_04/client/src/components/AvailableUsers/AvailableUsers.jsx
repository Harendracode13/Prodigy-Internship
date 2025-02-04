import React, { useEffect, useState } from "react";
import "./AvailableUsers.css";
import IMAGE from "../../assets/live-chat.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/UserSlice";

const AvailableUsers = () => {
  const Lighttheme = useSelector((state) => state.themekey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/allusers");
      const data = await response.json();
      setAllUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const filtered = allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    };
    filterUsers();
  }, [searchTerm, allUsers]);

  const HandleSelectedUser = (selectedUser) => {
    dispatch(setSelectedUser(selectedUser));
    navigate("/app/chat-area");
  };

  return (
    <div className="availableusers">
      <div className={"imgtextcontainer" + (Lighttheme ? "" : " dark")}>
        <img src={IMAGE} alt="logo" />
        <p>Available Users</p>
      </div>
      <div className={"searchbar" + (Lighttheme ? "" : " dark")}>
        <input
          type="text"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <div className={"allavailableusers" + (Lighttheme ? "" : " dark")}>
        {filteredUsers.map((user, i) => (
          <div
            key={i}
            onClick={() => {
              HandleSelectedUser(user);
            }}
            className="user-item"
          >
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableUsers;
