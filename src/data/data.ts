import { ProductsList } from "../misc/type";

export let mockProducts: ProductsList[] = [
  {
    id: 1,
    title: "product1",
    price: 1,
    description: "product1",
    images: ["img1", "img2"],
    creationAt: "",
    updatedAt: "",
    category: {
      id: 1,
      name: "Clothes",
      image: "",
      creationAt: "",
      updatedAt: "",
    },
  },
  {
    id: 2,
    title: "product2",
    price: 2,
    description: "product2",
    images: ["img1", "img2"],
    creationAt: "",
    updatedAt: "",
    category: {
      id: 2,
      name: "Electronics",
      image: "",
      creationAt: "",
      updatedAt: "",
    },
  },
];

export const mockCategories = [
  {
    id: 1,
    name: "Clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    creationAt: "2024-02-24T03:03:49.000Z",
    updatedAt: "2024-02-24T03:03:49.000Z",
  },
];
