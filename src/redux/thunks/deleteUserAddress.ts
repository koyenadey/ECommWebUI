import { createAsyncThunk } from "@reduxjs/toolkit";

interface DeleteAddress {
  baseUrl: string;
  token: string;
}

const deleteUserAddress = createAsyncThunk(
  "address/deleteUserAddress",
  async ({ baseUrl, token }: DeleteAddress, { rejectWithValue }) => {
    try {
      const result = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok) throw new Error(result.statusText);
      const data: string = await result.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default deleteUserAddress;
