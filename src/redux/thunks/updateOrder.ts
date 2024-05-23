import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order, UpdateOrderType } from "../../misc/type";

export type UpdateOrder = {
  baseUrl: string;
  order: UpdateOrderType;
  token: string;
};

const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ baseUrl, order, token }: UpdateOrder, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "PATCH",
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

export default updateOrder;
