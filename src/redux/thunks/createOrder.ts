import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateOrdersType, Order, Product } from "../../misc/type";

export type CreateOrderType = {
  baseUrl: string;
  order: CreateOrdersType;
  token: string;
};

const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ baseUrl, order, token }: CreateOrderType, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: Order = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default createOrder;
