import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../app/slice/cardSlice";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
  },
});
