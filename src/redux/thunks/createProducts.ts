import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../misc/type";

interface CreateProduct {
  baseUrl: string;
  product: Product;
}

const createProducts = createAsyncThunk(
  "products/createProducts",
  async ({ baseUrl, product }: CreateProduct, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(product),
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response: Response = await fetch(baseUrl, options);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: Product = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default createProducts;
