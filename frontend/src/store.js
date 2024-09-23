import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import foodSlice from "./features/foodSlice";

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice,
    foodReducer: foodSlice,
  },
});

export default store;
