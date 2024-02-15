import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductsList } from "../../../misc/type";

//const BASE_URL: string = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (baseUrl: string) => {
    try {
      const response: Response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
);

type InitialState = {
  products: ProductsList[];
  productDetails: Product | undefined;
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  products: [],
  productDetails: undefined,
  isLoading: false,
  error: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<string>) => {},
  },
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
          productDetails: Array.isArray(action.payload) ? null : action.payload,
          isLoading: false,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;
export const { getProduct } = productSlice.actions;

export default productReducer;
