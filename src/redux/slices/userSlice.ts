import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserType } from "../../misc/type";
import { Token } from "../../misc/type";

import fetchUser from "../thunks/fetchUser";
import createUserLogin from "../thunks/createUserLogin";
import updateUser from "../thunks/updateUser";
import fetchAcessToken from "../thunks/fetchAccessToken";
import fetchUsers from "../thunks/fetchUsers";
import createUsers from "../thunks/createUsers";

type InitialState = {
  user: UserType | undefined;
  users: UserType[];
  tokens: Token;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string;
};

const initialState: InitialState = {
  user: undefined,
  users: [],
  tokens: {
    refreshToken: "",
  },
  isLoading: true,
  error: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    resetLogin: (state) => {
      state.isLoggedIn = false;
      state.tokens.refreshToken = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserType[]>) => {
        return {
          ...state,
          isLoading: false,
          users: action.payload,
          error: "",
        };
      }
    );

    builder.addCase(fetchUsers.rejected, (state, action) => {
      const payload = action.payload as { message: string };
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          isLoggedIn: true,
        };
      }
    );

    builder.addCase(fetchUser.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      }
    });

    builder.addCase(createUserLogin.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      createUserLogin.fulfilled,
      (state, action: PayloadAction<Token>) => {
        localStorage.setItem("refresh-token", action.payload.refreshToken);
        return {
          ...state,
          isLoading: false,
          tokens: action.payload,
          isLoggedIn: true,
          error: "",
        };
      }
    );

    builder.addCase(createUserLogin.rejected, (state, action) => {
      const payload = action.payload as { message: string };
      return {
        ...state,
        isLoading: false,
        error: payload.message,
        isLoggedIn: false,
      };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        if (state?.user?.role == "Customer") {
          return {
            ...state,
            isLoading: false,
            user: action.payload,
          };
        } else return state;
      }
    );
    builder.addCase(updateUser.rejected, (state, action) => {
      const payload = action.payload as string;
      return {
        ...state,
        error: payload,
        isLoading: false,
        isLoggedIn: true,
      };
    });

    builder.addCase(fetchAcessToken.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      fetchAcessToken.fulfilled,
      (state, action: PayloadAction<Token>) => {
        return {
          ...state,
          isLoading: true,
          tokens: action.payload,
        };
      }
    );
    builder.addCase(fetchAcessToken.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      }
    });

    builder.addCase(createUsers.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      createUsers.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        return {
          ...state,
          isLoading: false,
          user: action.payload,
        };
      }
    );

    builder.addCase(createUsers.rejected, (state, action) => {
      const payload = action.payload as { message: string };
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });
  },
});

const userReducer = userSlice.reducer;
export const { resetLogin } = userSlice.actions;
export default userReducer;
