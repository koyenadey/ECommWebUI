import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddressType } from "../../misc/type";

interface AddressProp {
  baseUrl: string;
  token: string;
}

const fetchUserAddress = createAsyncThunk(
  "address/fetchAddresses",
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

      const result: AddressType[] = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUserAddress;
