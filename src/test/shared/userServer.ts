import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { USER_UPDATEURL } from "../../constants";

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
  http.put("https://api.escuelajs.co/api/v1/users/:userId", ({ request }) => {
    //console.log(request.url);
    const pathSegments = new URL(request.url).pathname.split("/");
    const userId = pathSegments[pathSegments.length - 1];
    //console.log(userId);
    if (!userId) return new HttpResponse(null, { status: 404 });

    const userToUpdate = mockUsers.find((user) => user.id === parseInt(userId));
    console.log("User", userToUpdate);

    if (!userToUpdate) return new HttpResponse(null, { status: 400 });
    userToUpdate.name = "TestDev";
    userToUpdate.email = "testDev1@mail.com";

    return HttpResponse.json(userToUpdate, { status: 204 });
  }),
];

export const userServer = setupServer(...handler);
