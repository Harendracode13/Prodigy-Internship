import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "ThemSlice",
  initialState: true,
  reducers: {
    toggleTheme: (state) => {
      return !state;
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
