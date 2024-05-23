import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Order,
  Product,
  ProductCart,
  UpdateProductCart,
} from "../../misc/type";
import fetchOrders from "../thunks/fetchOrders";
import createOrder from "../thunks/createOrder";
import updateOrder from "../thunks/updateOrder";
import fetchOrder from "../thunks/fetchOrder";

type InitialState = {
  orders: Order[];
  orderDetails: Order | undefined;
  isLoading: boolean;
  error: string;
  orderAddresId: string;
};

const initialState: InitialState = {
  orders: [],
  orderDetails: undefined,
  isLoading: false,
  error: "",
  orderAddresId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderAddresId(state, action: PayloadAction<string>) {
      state.orderAddresId = action.payload;
    },
    resetOrder(state) {
      state.orderDetails = undefined;
      state.orders = [];
      state.orderAddresId = "";
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrder.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      return {
        ...state,
        orderDetails: action.payload,
        isLoading: false,
        error: "",
      };
    });

    builder.addCase(fetchOrder.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
    });

    builder.addCase(fetchOrders.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        error: "",
      };
    });

    builder.addCase(fetchOrders.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
    });

    builder.addCase(createOrder.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      return {
        ...state,
        orderDetails: action.payload,
        isLoading: false,
        error: "",
      };
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
    });

    builder.addCase(updateOrder.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      const updatedOrders = state.orders.filter(
        (o) => o.orderId !== action.payload.orderId
      );
      updatedOrders.push(action.payload);
      return {
        ...state,
        orders: updatedOrders,
        orderDetails: action.payload,
        isLoading: false,
        error: "",
      };
    });

    builder.addCase(updateOrder.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
    });
  },
});

const orderReducer = orderSlice.reducer;

export const { setOrderAddresId, resetOrder } = orderSlice.actions;

export default orderReducer;
