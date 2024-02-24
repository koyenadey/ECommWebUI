import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../misc/type";

interface UserProp {
  baseUrl: string;
  token: string;
}

const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ baseUrl, token }: UserProp, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export default fetchUser;
