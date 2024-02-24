import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterFormType, UserType } from "../../misc/type";

export interface CreateUser {
  baseUrl: string;
  user: RegisterFormType;
}

const createUsers = createAsyncThunk(
  "users/createUsers",
  async ({ baseUrl, user }: CreateUser, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response: Response = await fetch(baseUrl, options);
      if (!response.ok) throw new Error("Failed to fetch the data");
      else {
        const data: UserType = await response.json();
        return data;
      }
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default createUsers;
