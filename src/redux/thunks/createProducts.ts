import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateProductType, ProductsList } from "../../misc/type";
interface CreateProduct {
  baseUrl: string;
  product: CreateProductType;
}

const createProducts = createAsyncThunk(
  "products/createProducts",
  async ({ baseUrl, product }: CreateProduct, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: ProductsList = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default createProducts;
