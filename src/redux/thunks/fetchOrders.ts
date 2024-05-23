import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../misc/type";

export type GetOrdersType = {
  baseUrl: string;
  token: string;
};

const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ baseUrl, token }: GetOrdersType, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: Order[] = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchOrders;
