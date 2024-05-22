import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { USER_UPDATEURL } from "../../constants";
import { RegisterFormType, UserType } from "../../misc/type";

const mockUsers = [
  {
    id: 1,
    email: "john@mail.com",
    password: "1234",
    name: "john",
    role: "customer",
    avatar: "https://i.imgur.com/yhW6Yw1.jpg",
  },
  {
    id: 4,
    email: "user1@gmail.com",
    password: "123456",
    name: "user1",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480",
  },
];

const handler = [
  // http.post("https://api.escuelajs.co/api/v1/users", async ({ request }) => {
  //   const user = (await request.json()) as RegisterFormType;
  //   const userToReturn: UserType = {
  //     id: "3",
  //     email: user.email,
  //     password: user.password,
  //     role: "customer",
  //     avatar: undefined,
  //     userName: user.userName,
  //   };
  //   return HttpResponse.json(userToReturn, { status: 204 });
  // }),

  http.put("https://api.escuelajs.co/api/v1/users/:userId", ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split("/");
    const userId = pathSegments[pathSegments.length - 1];

    if (!userId) return new HttpResponse(null, { status: 404 });

    const userToUpdate = mockUsers.find((user) => user.id === parseInt(userId));

    if (!userToUpdate) return new HttpResponse(null, { status: 400 });
    userToUpdate.name = "TestDev";
    userToUpdate.email = "testDev1@mail.com";

    return HttpResponse.json(userToUpdate, { status: 204 });
  }),
];

export const userServer = setupServer(...handler);
