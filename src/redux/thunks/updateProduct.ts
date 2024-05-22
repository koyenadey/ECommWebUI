import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductType, Product } from "../../misc/type";

interface UpdateProduct {
  baseUrl: string;
  product: CreateProductType;
  token: string;
}

const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ baseUrl, product, token }: UpdateProduct, { rejectWithValue }) => {
    try {
      const result = await fetch(baseUrl, {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
