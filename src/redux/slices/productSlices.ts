import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product, ProductsList } from "../../misc/type";
import fetchProducts from "../thunks/fetchProducts";
import createProducts from "../thunks/createProducts";
import fetchAllCategories from "../thunks/fetchAllCategories";

type InitialState = {
  products: ProductsList[];
  categories: Category[];
  productDetails: Product | undefined;
  isLoading: boolean;
  error: string;
  productCount: number;
};

const initialState: InitialState = {
  products: [],
  categories: [],
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

    builder.addCase(fetchAllCategories.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        categories: [],
      };
    });

    builder.addCase(
      fetchAllCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        return {
          ...state,
          categories: action.payload,
          isLoading: false,
        };
      }
    );

    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      const payload = action.payload as Error;
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });
  },
});

const productReducer = productSlice.reducer;
//export const {} = productSlice.actions;

export default productReducer;
