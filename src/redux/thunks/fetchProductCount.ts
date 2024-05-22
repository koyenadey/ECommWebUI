import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchProductCount = createAsyncThunk(
  "products/fetchProductCount",
  async (baseUrl: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: number = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchProductCount;
