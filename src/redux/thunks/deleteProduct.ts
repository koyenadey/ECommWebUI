import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (baseUrl: string, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default deleteProduct;
