import { Product, UserType } from "../misc/type";

export let mockProducts: Product[] = [
  {
    id: "P1",
    name: "product1",
    price: 1,
    description: "product1",
    images: [
      {
        productId: "1",
        imageUrl: "example1.jpg",
        id: "1",
        createdAt: "",
        updatedAt: "",
      },
    ],
    inventory: 10,
    weight: 0.2,
    creationAt: "",
    updatedAt: "",
    category: {
      id: "1",
      name: "Clothes",
      image: "",
      creationAt: "",
      updatedAt: "",
    },
  },
  {
    id: "2",
    name: "product2",
    price: 2,
    description: "product2",
    images: [
      {
        productId: "1",
        imageUrl: "example1.jpg",
        id: "1",
        createdAt: "",
        updatedAt: "",
      },
    ],
    inventory: 50,
    weight: 0.2,
    creationAt: "",
    updatedAt: "",
    category: {
      id: "2",
      name: "Electronics",
      image: "",
      creationAt: "",
      updatedAt: "",
    },
  },
];

export const mockUsers = [
  {
    id: "1",
    email: "john@mail.com",
    password: "changeme",
    userName: "Jhon",
    role: "customer",
    avatar: undefined,
  },
  {
    id: "2",
    email: "maria@mail.com",
    password: "12345",
    userName: "Maria",
    role: "customer",
    avatar: undefined,
  },
];

export const userProp = {
  baseUrl: "http://localhost:5240/api/v1",
  token: "mockToken",
};

export const mockCategories = [
  {
    id: 1,
    name: "Clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    creationAt: "2024-02-24T03:03:49.000Z",
    updatedAt: "2024-02-24T03:03:49.000Z",
  },
];

export const footerData = [
  { name: "Shipping", goTo: "aboutus", component: "shipping" },
  { name: "Customer Care", goTo: "aboutus", component: "customercare" },
  { name: "Returns Policy", goTo: "aboutus", component: "shipping" },
  { name: "Store Policy", goTo: "", component: "" },
  { name: "Payment Methods", goTo: "", component: "" },
  { name: "About Us", goTo: "aboutus", component: "aboutus" },
];

export const modalHeaderWarning = "Delete Address";
export const modalHeaderFailed = "Removal failed";
export const modalMessageWarning =
  "Are you sure you want to delete this address? Once deleted the address could not be recovered!";
export const modalMessageFailed =
  "This address is used as your residential address for digital purchases. To delete this address, first set a different residential address for your digital purchases.";

export const userMenuData = [
  { type: "Profile", url: "/profile", state: "" },
  { type: "Order History", url: "/order-history", state: "" },
  { type: "About Us", url: "/aboutus", state: "aboutus" },
  { type: "Shipping & Returns", url: "/aboutus", state: "shipping" },
  { type: "Customer Care", url: "/aboutus", state: "customercare" },
  //{ type: "LogOut", url: "/" },
];
export const userDashboardUrl = "/dashboard";

export const products = [
  {
    id: "6c37e6fe-03f2-43eb-8f2f-e44a47659e8d",
    name: "Lilac crop top",
    price: "$59.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716768336/63a5055c-2557-4ffa-935b-fc898c41b8b3.jpg",
  },
  {
    id: "33beb0b9-6a80-4288-8b60-375066ef036b",
    name: "Yellow culottes",
    price: "$48.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716768459/9075f767-4ec5-41fe-9a33-f7a7e6a43c01.jpg",
  },
  {
    id: "198ffbd1-7396-4000-a16a-cd5b0e934c33",
    name: "Magenta boots",
    price: "$69.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/MagentaBoot_kitrk0.webp",
  },
  {
    id: "e30486c0-5d7a-4540-a8f3-4537b80293d8",
    name: "Blue Denim Jacket",
    price: "$29.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/Denim_jacket_ixb4iq.webp",
  },
];
