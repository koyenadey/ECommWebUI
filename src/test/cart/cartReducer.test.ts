import { Product, ProductCart, UpdateProductCart } from "../../misc/type";
import cartReducer, {
  addToCart,
  removeFromCart,
  updateCart,
} from "../../redux/slices/cartSlice";

const initialState = {
  cart: [],
  quantity: 0,
  subTotal: 0,
};

const mockCart: Product[] = [
  {
    id: "1",
    name: "Product1",
    price: 10,
    description: "A description",
    inventory: 1,
    weight: 0.2,
    images: [
      {
        productId: "1",
        imageUrl: "example1.jpg",
        id: "1",
        createdAt: "",
        updatedAt: "",
      },
    ],
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
];

describe("Cart Reducer", () => {
  test("The cart should return initial state", () => {
    const state = cartReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  test("The cart should add item", () => {
    const mockItemToBeAdded: Product = {
      id: "1",
      name: "Product1",
      price: 10,
      description: "A description",
      inventory: 1,
      weight: 0.2,
      images: [
        {
          productId: "1",
          imageUrl: "example1.jpg",
          id: "1",
          createdAt: "",
          updatedAt: "",
        },
      ],
      creationAt: "",
      updatedAt: "",
      category: {
        id: "1",
        name: "Clothes",
        image: "",
        creationAt: "",
        updatedAt: "",
      },
    };
    const state = cartReducer(initialState, addToCart(mockItemToBeAdded));

    const expectedState = {
      cart: [mockItemToBeAdded],
      quantity: 1,
      subTotal: 10,
    };

    expect(state).toEqual(expectedState);
  });

  test("The cart should update item in the cart", () => {
    const currentState = {
      cart: [...mockCart],
      quantity: 1,
      subTotal: 10,
    };

    const mockItemToBeUpdated: UpdateProductCart = {
      productId: "1",
      quantity: 2,
    };

    const state = cartReducer(currentState, updateCart(mockItemToBeUpdated));
    expect(state.subTotal).toEqual(20);
  });

  test("The cart should have no items left", () => {
    const currentState = {
      cart: [...mockCart],
      quantity: 1,
      subTotal: 20,
    };

    const state = cartReducer(currentState, removeFromCart("1"));
    expect(state.cart.length).toBe(0);
  });
});
