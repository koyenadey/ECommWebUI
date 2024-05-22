import { createAsyncThunk } from "@reduxjs/toolkit";

interface AddressProp {
  baseUrl: string;
  token: string;
}

const fetchDefaultAddress = createAsyncThunk(
  "address/fetchDefaultAddresses",
  async ({ baseUrl, token }: AddressProp, { rejectWithValue }) => {
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

      const result: string = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchDefaultAddress;
