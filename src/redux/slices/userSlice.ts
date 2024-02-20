import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UsersList } from "../../misc/type";

import fetchUsers from "../thunks/fetchUsers";
import createUserLogin from "../thunks/createUserLogin";

type Token = {
  access_token: string;
  refresh_token: string;
};

type InitialState = {
  users: UsersList[];
  tokens: Token;
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  tokens: {
    access_token: "",
    refresh_token: "",
  },
  users: [],
  isLoading: true,
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UsersList[]>) => {
        return {
          ...state,
          users: action.payload,
          isLoading: false,
        };
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(
      createUserLogin.fulfilled,
      (state, action: PayloadAction<Token>) => {
        return {
          ...state,
          isLoading: false,
          tokens: action.payload,
        };
      }
    );
  },
});

const userReducer = userSlice.reducer;
//export const {} = userSlice.actions;
export default userReducer;
