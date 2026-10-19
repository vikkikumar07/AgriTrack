import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./counter/counterSlice";

export let store = configureStore({
  reducer: {
    user: userReducer,
  },
});
