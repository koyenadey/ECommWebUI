import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlices";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    productReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
