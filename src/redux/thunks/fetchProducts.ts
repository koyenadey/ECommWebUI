import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsList } from "../../misc/type";

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (baseUrl: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: ProductsList[] = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchProducts;
