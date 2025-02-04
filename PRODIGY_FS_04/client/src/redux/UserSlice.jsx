import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  selectedUser: null,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setCurrentUser, setSelectedUser } = UserSlice.actions;

export default UserSlice.reducer;
