import { createAsyncThunk } from "@reduxjs/toolkit";

import { Token } from "../../misc/type";

type FetchTokenType = {
  baseUrl: string;
  token: {
    refreshToken: string;
  };
};

const fetchAcessToken = createAsyncThunk(
  "user/fetchAccessToken",
  async ({ baseUrl, token }: FetchTokenType, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(token),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Data fetch failed");
      const result: Token = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchAcessToken;
