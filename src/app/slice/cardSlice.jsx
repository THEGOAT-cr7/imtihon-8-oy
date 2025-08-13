import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    increment: (state, action) => {},
    decrement: (state, action) => {},
  },
});

export const { increment, decrement } = cardSlice.actions;
export default cardSlice.reducer;
