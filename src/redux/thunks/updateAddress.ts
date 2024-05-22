import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddressEditFormInput } from "../../components/address/EditAddress";
import { AddressType, AddressUserType } from "../../misc/type";

interface UpdateAddress {
  baseUrl: string;
  address: AddressEditFormInput;
  token: string;
}

const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ baseUrl, address, token }: UpdateAddress, { rejectWithValue }) => {
    try {
      const result = await fetch(baseUrl, {
        method: "PATCH",
        body: JSON.stringify(address),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok) throw new Error(result.statusText);
      const data: AddressType = await result.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default updateAddress;
