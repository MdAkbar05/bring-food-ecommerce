import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.item.find(
        (itm) => itm.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.item.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.item.reduce(
        (total, itm) => total + itm.price * itm.quantity,
        0
      );
      state.totalCount = state.item.reduce(
        (count, itm) => count + itm.quantity,
        0
      );
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.item.find((itm) => itm.id === id);

      if (item) {
        item.quantity = quantity;
        state.totalPrice = state.item.reduce(
          (total, itm) => total + itm.price * itm.quantity,
          0
        );
        state.totalCount = state.item.reduce(
          (count, itm) => count + itm.quantity,
          0
        );
      }
    },
    removeFromCart: (state, action) => {
      state.item = state.item.filter((itm) => itm.id !== action.payload);
      state.totalPrice = state.item.reduce(
        (total, itm) => total + itm.price * itm.quantity,
        0
      );
      state.totalCount = state.item.reduce(
        (count, itm) => count + itm.quantity,
        0
      );
    },
  },
});

export const { addToCart, changeQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
