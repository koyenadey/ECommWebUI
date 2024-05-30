import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Product, ProductsList } from "../../misc/type";
import fetchProducts from "../thunks/fetchProducts";
import createProducts from "../thunks/createProducts";
import fetchAllCategories from "../thunks/fetchAllCategories";
import updateProduct from "../thunks/updateProduct";
import deleteProduct from "../thunks/deleteProduct";
import fetchProductCount from "../thunks/fetchProductCount";
import fetchProduct from "../thunks/fetchProduct";
import { Review } from "../../components/reviews/ReviewItem";
import fetchFeaturedProds from "../thunks/fetchFeaturedProds";

type InitialState = {
  products: Product[];
  categories: Category[];
  productDetails: Product | undefined;
  isLoading: boolean;
  error: string;
  productCount: number;
  searchText: string;
  sortType: string;
  sortOrder: string;
  deletedId: string;
  featuredProducts: Product[];
};

const initialState: InitialState = {
  products: [],
  categories: [],
  productDetails: undefined,
  isLoading: false,
  error: "",
  productCount: 0,
  searchText: "",
  sortType: "byPrice",
  sortOrder: "asc",
  deletedId: "",
  featuredProducts: [],
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
    addSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    resetProduct: (state) => {
      state.sortOrder = "asc";
      state.sortType = "byPrice";
      state.searchText = "";
      state.error = "";
      state.deletedId = "";
      state.productCount = 0;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchProduct.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return {
        ...state,
        productDetails: action.payload,
        isLoading: false,
        isDeleted: false,
      };
    });

    builder.addCase(fetchProduct.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
    });

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
      return {
        ...state,
        products: Array.isArray(action.payload) ? action.payload : [],
        productDetails: undefined,
        isLoading: false,
        isDeleted: false,
      };
    });

    builder.addCase(fetchProductCount.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(fetchProductCount.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        productCount: action.payload,
        isDeleted: false,
      };
    });

    builder.addCase(fetchProductCount.rejected, (state, action) => {
      const payload = action.payload as Error;
      const errorMessage = payload ? payload.message : "An error occurred";
      return {
        ...state,
        isLoading: false,
        error: errorMessage,
      };
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
        const products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
        products.push(action.payload);
        return {
          ...state,
          isLoading: false,
          products: products,
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
      (state, action: PayloadAction<Product>) => {
        const products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
        return {
          ...state,
          isLoading: false,
          products: products,
          deletedId: action.payload.id,
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

    builder.addCase(fetchFeaturedProds.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    });

    builder.addCase(
      fetchFeaturedProds.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        return {
          ...state,
          isLoading: false,
          featuredProducts: action.payload,
        };
      }
    );

    builder.addCase(fetchFeaturedProds.rejected, (state, action) => {
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
export const { addSearchText, addSortType, addSortOrder, resetProduct } =
  productSlice.actions;

export default productReducer;
