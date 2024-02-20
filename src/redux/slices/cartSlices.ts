import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductCart, UpdateProductCart } from "../../misc/type";

type InitialState = {
  cart: ProductCart[];
  quantity: number;
};

const initialState: InitialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCart>) => {
      const product: ProductCart | undefined = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!product) {
        state.cart.push(action.payload);
      } else product.quantity += action.payload.quantity;

      state.quantity = state.cart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
    },
    updateCart: (state, action: PayloadAction<UpdateProductCart>) => {
      //state.quantity += action.payload;
      const productToBeUpdated = state.cart.find(
        (product) => product.id === action.payload.productId
      );

      if (productToBeUpdated) {
        productToBeUpdated.quantity = action.payload.quantity;
      }

      state.quantity = state.cart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productExists = state.cart.find((p) => p.id === action.payload);
      if (productExists) {
        state.cart = state.cart.filter((c) => c.id !== action.payload);
      }

      state.quantity = state.cart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
    },
  },
});

const cartReducer = cartSlice.reducer;

export const { removeFromCart, addToCart, updateCart } = cartSlice.actions;

export default cartReducer;
