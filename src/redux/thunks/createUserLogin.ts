import { createAsyncThunk } from "@reduxjs/toolkit";

import { Token } from "../../misc/type";

export type UserLoginData = {
  email: string;
  password: string;
};

export type LoginDetails = {
  baseUrl: string;
  userData: UserLoginData;
};

const createUserLogin = createAsyncThunk(
  "users/createUserLogin",
  async ({ baseUrl, userData }: LoginDetails, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error(response.statusText);
      const result: Token = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

export default createUserLogin;
