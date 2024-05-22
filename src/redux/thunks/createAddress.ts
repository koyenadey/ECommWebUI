import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddressCreateFormInput } from "../../components/address/CreateAddress";
import { AddressType } from "../../misc/type";

interface CreateAddress {
  baseUrl: string;
  address: AddressCreateFormInput;
  token: string;
}

const createAddress = createAsyncThunk(
  "address/createAddress",
  async ({ baseUrl, address, token }: CreateAddress, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(address),
        headers: {
          "Content-Type": "application/json",
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

export default createAddress;
