import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersList } from "../../misc/type";

const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (baseUrl: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl);
      if (!response.ok) throw new Error("Failed to fetch the data");
      else {
        const data: UsersList[] = await response.json();
        return data;
      }
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUsers;
