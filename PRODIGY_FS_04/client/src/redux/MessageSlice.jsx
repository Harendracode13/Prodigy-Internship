import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:4000/messages/${userId}`
    );
    return response.data;
  }
);

const initialState = {
  messages: [],
  recentChats: [],
  status: "idle",
  error: null,
};

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);

      // Check if this chat already exists in recent chats
      const userId = action.payload.receiver;
      const existingChatIndex = state.recentChats.findIndex(
        (chat) => chat.userId === userId
      );

      if (existingChatIndex > -1) {
        // If chat exists, move it to the top
        const chatToUpdate = state.recentChats.splice(existingChatIndex, 1)[0];
        chatToUpdate.lastMessage = action.payload.message;
        state.recentChats.unshift(chatToUpdate);
      } else {
        // If it's a new chat, add it to recent chats
        state.recentChats.unshift({
          userId: action.payload.receiver,
          username: action.payload.username,
          lastMessage: action.payload.message,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
