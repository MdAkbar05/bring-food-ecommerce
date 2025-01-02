import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import foodSlice from "./features/foodSlice";
import userSlice from "./features/userSlice";
import orderSlice from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice,
    foodReducer: foodSlice,
    userReducer: userSlice,
    orderReducer: orderSlice,
  },
});

export default store;
