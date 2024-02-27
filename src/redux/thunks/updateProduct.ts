import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductType, Product } from "../../misc/type";

interface UpdateProduct {
  baseUrl: string;
  product: CreateProductType;
}

const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ baseUrl, product }: UpdateProduct, { rejectWithValue }) => {
    try {
      const result = await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok) throw new Error(result.statusText);
      const data: Product = await result.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default updateProduct;
