import { createAsyncThunk } from "@reduxjs/toolkit";
import { WishlistType } from "../../misc/type";

interface WishlistProp {
  baseUrl: string;
  token: string;
}

const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async ({ baseUrl, token }: WishlistProp, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: WishlistType[] = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchWishlist;
