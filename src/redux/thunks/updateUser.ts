import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../misc/type";

export interface UpdateUser {
  baseUrl: string;
  user: FormData;
  token: string;
}

const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ baseUrl, user, token }: UpdateUser, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "PATCH",
        body: user,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("This user cannot be edited");
        else throw new Error("This user cannot be edited");
      }

      const data: UserType = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default updateUser;
