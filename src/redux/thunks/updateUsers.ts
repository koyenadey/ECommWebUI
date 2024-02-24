import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../misc/type";

export interface UpdateUser {
  baseUrl: string;
  user: {
    name: string;
    email: string;
  };
}

const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ baseUrl, user }: UpdateUser, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch the data");

      const data: UserType = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default updateUser;
