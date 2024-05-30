import { createAsyncThunk } from "@reduxjs/toolkit";
import { WishlistItem } from "../../misc/type";

interface DeleteWishlistItem {
  baseUrl: string;
  token: string;
  productId: string;
}

const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (
    { baseUrl, token, productId }: DeleteWishlistItem,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error("Error occured!");
      const data: WishlistItem = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default deleteFromWishlist;
