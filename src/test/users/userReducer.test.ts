import { USER_GETURL, USER_UPDATEURL } from "../../constants";
import { mockUsers, userProp } from "../../data/data";
import userReducer from "../../redux/slices/userSlice";
import store from "../../redux/store";
import createUsers from "../../redux/thunks/createUsers";
import fetchUsers from "../../redux/thunks/fetchUsers";
import updateUser from "../../redux/thunks/updateUser";
import { userServer } from "../shared/userServer";

beforeAll(() => userServer.listen());

afterAll(() => userServer.close());

const initialState = {
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
};

describe("user reducer", () => {
  test("should return initial state", () => {
    const state = userReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  test("should return a list of users", () => {
    const state = userReducer(
      initialState,
      fetchUsers.fulfilled(mockUsers, "fulfilled", userProp)
    );
    expect(state).toEqual({
      user: undefined,
      users: mockUsers,
      tokens: {
        refreshToken: "",
      },
      isLoading: false,
      isLoggedIn: false,
      error: "",
    });
  });

  test("should register the user from api", async () => {
    const userToBeCreated = {
      name: "Nicolas",
      password: "1234",
      email: "nico@gmail.com",
      avatar: "https://picsum.photos/800",
    };

    const expectedResult = {
      id: 3,
      email: "nico@gmail.com",
      password: "1234",
      name: "Nicolas",
      role: "customer",
      avatar: "https://picsum.photos/800",
    };
    const userObj = {
      baseUrl: USER_GETURL,
      user: userToBeCreated,
    };
    await store.dispatch(createUsers(userObj));
    expect(store.getState().userReducer.user).toEqual(expectedResult);
  });

  test("should update the user from api", async () => {
    const userToBeUpdated = {
      name: "TestDev1",
      avatar: "https://i.imgur.com/yhW6Yw1.jpg",
    };

    const expectedResult = {
      id: 1,
      email: "testDev1@mail.com",
      password: "1234",
      name: "TestDev1",
      role: "customer",
      avatar: "https://i.imgur.com/yhW6Yw1.jpg",
    };
    const userObj = {
      baseUrl: USER_UPDATEURL + "1",
      user: userToBeUpdated,
    };
    //await store.dispatch(updateUser(userObj));
    expect(store.getState().userReducer.user).toEqual(expectedResult);
  });
});
