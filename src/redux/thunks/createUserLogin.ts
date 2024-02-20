import { createAsyncThunk } from "@reduxjs/toolkit";

export type UserLoginData = {
  email: string;
  password: string;
};

export type LoginDetails = {
  baseUrl: string;
  userData: UserLoginData;
};

type Result = {
  access_token: string;
  refresh_token: string;
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
      if (!response.ok) throw new Error("The data fetch failed!");
      const result: Result = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default createUserLogin;
