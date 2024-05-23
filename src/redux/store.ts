import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import { useDispatch } from "react-redux";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    userReducer,
    orderReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
