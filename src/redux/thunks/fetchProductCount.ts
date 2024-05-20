import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchProductCount = createAsyncThunk(
  "products/fetchProductCount",
  async (baseUrl: string, { rejectWithValue }) => {
    console.log("get product count: " + baseUrl);
    try {
      const response: Response = await fetch(baseUrl);
      console.log("get products response: " + JSON.stringify(response));

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: number = await response.json();
      console.log("get products returning: " + result);
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchProductCount;
