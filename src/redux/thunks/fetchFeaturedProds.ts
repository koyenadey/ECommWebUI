import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../misc/type";

const fetchFeaturedProds = createAsyncThunk(
  "products/fetchFeaturedProds",
  async (baseUrl: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: Product[] = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchFeaturedProds;
