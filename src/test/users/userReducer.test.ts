import { USER_UPDATEURL } from "../../constants";
import store from "../../redux/store";
import updateUser from "../../redux/thunks/updateUsers";
import { userServer } from "../shared/userServer";

beforeAll(() => userServer.listen());

afterAll(() => userServer.close());

describe("user reducer", () => {
  //test async thunk
  test("should get the requested user from api", async () => {
    const userToBeUpdated = {
      name: "TestDev",
      email: "testDev1@mail.com",
      role: "customer",
    };

    const expectedResult = {
      id: 1,
      email: "testDev1@mail.com",
      password: "1234",
      name: "TestDev",
      role: "customer",
      avatar: "https://i.imgur.com/yhW6Yw1.jpg",
    };
    const userObj = {
      baseUrl: USER_UPDATEURL + "1",
      user: userToBeUpdated,
    };
    await store.dispatch(updateUser(userObj));
    expect(store.getState().userReducer.user).toEqual(expectedResult);
  });
});
