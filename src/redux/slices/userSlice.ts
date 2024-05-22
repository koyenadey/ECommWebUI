import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AddressType, UserType } from "../../misc/type";
import { Token } from "../../misc/type";

import fetchUser from "../thunks/fetchUser";
import createUserLogin from "../thunks/createUserLogin";
import updateUser from "../thunks/updateUser";
import fetchAcessToken from "../thunks/fetchAccessToken";
import fetchUsers from "../thunks/fetchUsers";
import createUsers from "../thunks/createUsers";
import fetchUserAddress from "../thunks/fetchUserAddress";
import updateAddress from "../thunks/updateAddress";
import fetchDefaultAddress from "../thunks/fetchDefaultAddress";
import deleteUserAddress from "../thunks/deleteUserAddress";
import checkEmailExists from "../thunks/checkEmailExists";

type InitialState = {
  user: UserType | undefined;
  addresses: AddressType[];
  defaultAddId: string;
  users: UserType[];
  tokens: Token;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string;
  emailExist: boolean;
};

const initialState: InitialState = {
  user: undefined,
  addresses: [],
  defaultAddId: "",
  users: [],
  tokens: {
    refreshToken: "",
  },
  isLoading: true,
  error: "",
  isLoggedIn: false,
  emailExist: false,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    resetLogin: (state) => {
      state.isLoggedIn = false;
      state.tokens.refreshToken = "";
    },
    updateAddresses: (state, action: PayloadAction<string>) => {
      const updatedAddress = state.addresses.filter(
        (a) => a.id !== action.payload
      );
      state.addresses = updatedAddress;
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

    builder.addCase(checkEmailExists.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      checkEmailExists.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        return {
          ...state,
          isLoading: false,
          emailExist: action.payload,
          error: "",
        };
      }
    );

    builder.addCase(checkEmailExists.rejected, (state, action) => {
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

    builder.addCase(fetchDefaultAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      fetchDefaultAddress.fulfilled,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          defaultAddId: action.payload,
          isLoading: false,
          isLoggedIn: true,
        };
      }
    );

    builder.addCase(fetchDefaultAddress.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
      }
    });

    builder.addCase(fetchUserAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      fetchUserAddress.fulfilled,
      (state, action: PayloadAction<AddressType[]>) => {
        return {
          ...state,
          addresses: action.payload,
          isLoading: false,
          isLoggedIn: true,
        };
      }
    );

    builder.addCase(fetchUserAddress.rejected, (state, action) => {
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
        if (state?.user?.role === "Customer") {
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

    builder.addCase(updateAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      updateAddress.fulfilled,
      (state, action: PayloadAction<AddressType>) => {
        const addressIndex = state.addresses.findIndex(
          (a) => a.id === action.payload.id
        );
        if (addressIndex !== -1) {
          const newAddress = state.addresses.filter(
            (a) => a.id !== action.payload.id
          );
          const updatedAddress = [...newAddress, action.payload];
          return {
            ...state,
            isLoading: false,
            addresses: updatedAddress,
            isLoggedIn: true,
            error: "",
          };
        } else {
          return {
            ...state,
            isLoading: false,
            addresses: state.addresses,
            isLoggedIn: true,
            error: "",
          };
        }
      }
    );

    builder.addCase(updateAddress.rejected, (state, action) => {
      const payload = action.payload as string;
      return {
        ...state,
        error: payload,
        isLoading: false,
        isLoggedIn: true,
      };
    });

    builder.addCase(deleteUserAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      deleteUserAddress.fulfilled,
      (state, action: PayloadAction<string>) => {
        if (action.payload) {
          const updatedAddress = state.addresses.filter(
            (a) => a.id !== action.payload
          );
          return {
            ...state,
            isLoading: false,
            addresses: updatedAddress,
            isLoggedIn: true,
            error: "",
          };
        } else {
          return {
            ...state,
          };
        }
      }
    );

    builder.addCase(deleteUserAddress.rejected, (state, action) => {
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
