import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../misc/type";

interface DeleteProduct {
  baseUrl: string;
  token: string;
}

const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ baseUrl, token }: DeleteProduct, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error occured!");
      const data: Product = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default deleteProduct;
