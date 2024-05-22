import { createAsyncThunk } from "@reduxjs/toolkit";

import { Product } from "../../misc/type";
interface CreateProduct {
  baseUrl: string;
  product: FormData;
  token: string;
}

const createProducts = createAsyncThunk(
  "products/createProducts",
  async ({ baseUrl, product, token }: CreateProduct, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "POST",
        body: product,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
