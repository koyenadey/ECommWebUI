import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlices";
import cartReducer from "./slices/cartSlices";
import userReducer from "./slices/userSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
