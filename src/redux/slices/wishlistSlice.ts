import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WishlistItem, WishlistType } from "../../misc/type";
import fetchWishlist from "../thunks/fetchWishlist";
import deleteFromWishlist from "../thunks/deleteFromWishlist";
import addToWishlist from "../thunks/addToWishlist";
import Wishlist from "../../pages/Wishlist";

type InitialState = {
  wishlists: WishlistType[];
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  wishlists: [],
  isLoading: true,
  error: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchWishlist.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      fetchWishlist.fulfilled,
      (state, action: PayloadAction<WishlistType[]>) => {
        return {
          ...state,
          isLoading: false,
          error: "",
          wishlists: action.payload,
        };
      }
    );

    builder.addCase(fetchWishlist.rejected, (state, action) => {
      const payload = action.payload as { message: string };
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });

    builder.addCase(deleteFromWishlist.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      deleteFromWishlist.fulfilled,
      (state, action: PayloadAction<WishlistItem>) => {
        const wishlists = state.wishlists.filter(
          (wishlist) => wishlist.id !== action.payload.id
        );
        return {
          ...state,
          isLoading: false,
          error: "",
          wishlists,
        };
      }
    );

    builder.addCase(deleteFromWishlist.rejected, (state, action) => {
      const payload = action.payload as { message: string };
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });

    builder.addCase(addToWishlist.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      addToWishlist.fulfilled,
      (state, action: PayloadAction<WishlistType[]>) => {
        return {
          ...state,
          isLoading: false,
          error: "",
          wishlists: action.payload,
        };
      }
    );

    builder.addCase(addToWishlist.rejected, (state, action) => {
      const payload = action.payload as { message: string };
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });
  },
});

const wishlistReducer = wishlistSlice.reducer;
export const {} = wishlistSlice.actions;
export default wishlistReducer;
