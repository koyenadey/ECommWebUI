import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterFormType, UserType } from "../../misc/type";

export interface CreateUser {
  baseUrl: string;
  email: string;
}

const checkEmailExists = createAsyncThunk(
  "users/checkEmailExists",
  async ({ baseUrl, email }: CreateUser, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response: Response = await fetch(baseUrl, options);
      if (!response.ok) throw new Error("Failed to fetch the data");
      else {
        const data: boolean = await response.json();
        return data;
      }
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default checkEmailExists;
