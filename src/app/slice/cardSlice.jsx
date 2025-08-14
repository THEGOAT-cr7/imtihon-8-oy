import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cart: [],
      totalPrice: 0,
      totalAmount: 0,
    };

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increase: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, amount: item.amount + 1 } : item
      );
    },
    decrease: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, amount: item.amount - 1 } : item
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
    calculateTotal: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;
      state.cart.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },
  },
});

export const {
  addToCart,
  calculateTotal,
  clearCart,
  decrease,
  deleteItem,
  increase,
} = cardSlice.actions;
export default cardSlice.reducer;
