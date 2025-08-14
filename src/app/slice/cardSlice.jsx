import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(p => p.id === action.payload.id);
      if (existing) {
        existing.amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
    },
    increase: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.items = state.items.filter(p => p.id !== action.payload);
        }
      }
    },
    remove: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { addToCart, increase, decrease, remove } = cartSlice.actions;
export default cartSlice.reducer;
