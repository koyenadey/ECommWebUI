import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductsList } from "../../misc/type";
import fetchProducts from "../thunks/fetchProducts";
import createProducts from "../thunks/createProducts";

type InitialState = {
  products: ProductsList[];
  productDetails: Product | undefined;
  isLoading: boolean;
  error: string;
  productCount: number;
};

const initialState: InitialState = {
  products: [],
  productDetails: undefined,
  isLoading: false,
  error: "",
  productCount: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: Array.isArray(action.payload) ? action.payload : [],
          productDetails: Array.isArray(action.payload)
            ? undefined
            : action.payload,
          isLoading: false,
          productCount: action.payload.length ?? 0,
        };
      }
    });
    builder.addCase(createProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(createProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        productDetails: action.payload,
      };
    });
    builder.addCase(createProducts.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: true,
          error: action.payload.message,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;
//export const {} = productSlice.actions;

export default productReducer;
