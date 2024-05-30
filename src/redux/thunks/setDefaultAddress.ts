import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddressType } from "../../misc/type";

interface SetDefault {
  baseUrl: string;
  token: string;
}

const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async ({ baseUrl, token }: SetDefault, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: AddressType = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default setDefaultAddress;
