import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product, ProductsList } from "../../misc/type";
import fetchProducts from "../thunks/fetchProducts";
import createProducts from "../thunks/createProducts";
import fetchAllCategories from "../thunks/fetchAllCategories";
import updateProduct from "../thunks/updateProduct";
import deleteProduct from "../thunks/deleteProduct";

type InitialState = {
  products: ProductsList[];
  categories: Category[];
  productDetails: Product | undefined;
  isLoading: boolean;
  error: string;
  productCount: number;
  searchText: string;
  sortType: string;
  isDeleted: boolean;
};

const initialState: InitialState = {
  products: [],
  categories: [],
  productDetails: undefined,
  isLoading: false,
  error: "",
  productCount: 0,
  searchText: "",
  sortType: "asc",
  isDeleted: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    addSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
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
          isDeleted: false,
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

    builder.addCase(updateProduct.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      updateProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        return {
          ...state,
          isLoading: false,
          productDetails: action.payload,
        };
      }
    );

    builder.addCase(updateProduct.rejected, (state, action) => {
      const payload = action.payload as Error;
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });

    builder.addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    });

    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        return {
          ...state,
          isLoading: false,
          isDeleted: action.payload,
        };
      }
    );

    builder.addCase(deleteProduct.rejected, (state, action) => {
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
export const { addSearchText, addSortType } = productSlice.actions;

export default productReducer;
