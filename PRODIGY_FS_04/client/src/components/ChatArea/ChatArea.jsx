import React, { useEffect, useState } from "react";
import "./ChatArea.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addMessage, fetchMessages } from "../../redux/MessageSlice";
import NotificationSound from "../../assets/notification.mp3";
import { useSound } from "use-sound";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const socket = io("http://localhost:4000");

const ChatArea = () => {
  const Lighttheme = useSelector((state) => state.themekey);
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.userkey.selectedUser);
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.message.messages);
  const [play] = useSound(NotificationSound);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    socket.on("new_message", (newMessage) => {
      dispatch(addMessage(newMessage));
    });
    play();

    return () => {
      socket.off();
    };
  }, [dispatch]);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/sendmessage/${selectedUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            receiver: selectedUser._id,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setMessage("");
        play();
      } else {
        console.error(responseData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatarea">
      <div className={"selectedUsersDetails" + (Lighttheme ? "" : " dark")}>
        {selectedUser && (
          <div className="informations">
            <h1>{selectedUser.username}</h1>
            <p>{selectedUser.email}</p>
          </div>
        )}
      </div>
      <div className={"msg-container" + (Lighttheme ? "" : " dark")}>
        {selectedUser && messages.length === 0 && (
          <div className="introselectedUser">
            <p>Start chatting with {selectedUser.username}💻</p>
          </div>
        )}

        {selectedUser &&
          messages.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.receiver === selectedUser._id ? "yourmessage" : "mymessage"
              }
            >
              <p>{msg.message}</p>
              <p className="time">{moment().format("h:mm a")}</p>
            </div>
          ))}
      </div>

      <form
        onSubmit={sendMessage}
        className={"sendmsgcontainer" + (Lighttheme ? "" : " dark")}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default ChatArea;
