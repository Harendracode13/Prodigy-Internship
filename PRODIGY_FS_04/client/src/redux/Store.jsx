import { configureStore } from "@reduxjs/toolkit";
import ThemeSliceReducer from "./ThemeSlice";
import UserSliceReducer from "./UserSlice";
import MessageSliceReducer from "./MessageSlice";
const Store = configureStore({
  reducer: {
    themekey: ThemeSliceReducer,
    userkey: UserSliceReducer,
    message: MessageSliceReducer,
  },
});

export default Store;
