import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import reviewReducer from "./slices/reviewSlice";
import wishlistReducer from "./slices/wishlistSlice";
import { useDispatch } from "react-redux";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    userReducer,
    orderReducer,
    reviewReducer,
    wishlistReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
