import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, ProductCart, UpdateProductCart } from "../../misc/type";

type InitialState = {
  cart: Product[];
  quantity: number;
  subTotal: number;
};

const initialState: InitialState = {
  cart: [],
  quantity: 0,
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product: Product | undefined = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!product) {
        state.cart.push(action.payload);
      } else product.inventory += action.payload.inventory;

      console.log(state.cart[0].inventory);

      state.quantity = state.cart.reduce((acc, curr) => {
        return acc + curr.inventory;
      }, 0);

      state.subTotal = state.cart.reduce((acc, curr) => {
        return acc + curr.inventory * curr.price;
      }, 0);
    },
    updateCart: (state, action: PayloadAction<UpdateProductCart>) => {
      const productToBeUpdated = state.cart.find(
        (product) => product.id === action.payload.productId
      );

      if (productToBeUpdated) {
        productToBeUpdated.inventory = action.payload.quantity;
      }

      state.quantity = state.cart.reduce((acc, curr) => {
        return acc + curr.inventory;
      }, 0);

      state.subTotal = state.cart.reduce((acc, curr) => {
        return acc + curr.inventory * curr.price;
      }, 0);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productExists = state.cart.find((p) => p.id === action.payload);
      if (productExists) {
        state.cart = state.cart.filter((pc) => pc.id !== action.payload);
      }

      state.quantity = state.cart.reduce((acc, curr) => {
        return acc + curr.inventory;
      }, 0);

      state.subTotal = state.cart.reduce((acc, curr) => {
        return acc + curr.inventory * curr.price;
      }, 0);
    },

    resetCart: (state) => {
      state.cart = [];
      state.quantity = 0;
      state.subTotal = 0;
    },
  },
});

const cartReducer = cartSlice.reducer;

export const { removeFromCart, addToCart, updateCart, resetCart } =
  cartSlice.actions;

export default cartReducer;
