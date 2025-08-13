import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/slice/cardSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
