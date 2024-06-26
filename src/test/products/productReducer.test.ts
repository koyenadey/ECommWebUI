import { CATGET_URL, GETURL } from "../../constants";
import { mockProducts } from "../../data/data";
import { CreateProductType, Product, UpdateProductType } from "../../misc/type";
import productReducer from "../../redux/slices/productSlice";
import store from "../../redux/store";
import createProducts from "../../redux/thunks/createProducts";
import fetchAllCategories from "../../redux/thunks/fetchAllCategories";
import fetchProducts from "../../redux/thunks/fetchProducts";
import updateProduct from "../../redux/thunks/updateProduct";
import { productServer } from "../shared/productServer";

const initialState = {
  products: [],
  categories: [],
  productDetails: undefined,
  isLoading: false,
  error: "",
  productCount: 0,
  searchText: "",
  sortType: "byPrice",
  sortOrder: "asc",
  deletedId: "",
  featuredProducts: [],
};

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe("Product Reducer", () => {
  test("should return initial state", () => {
    const state = productReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  test("should return a list of products", () => {
    const state = productReducer(
      initialState,
      fetchProducts.fulfilled(mockProducts, "fulfilled", "")
    );
    expect(state).toEqual({
      products: Array.isArray(mockProducts) ? mockProducts : [],
      categories: [],
      isLoading: false,
      productDetails: Array.isArray(mockProducts) ? undefined : mockProducts,
      productCount: mockProducts.length,
      error: "",
      searchText: "",
      sortType: "byPrice",
      sortOrder: "asc",
      isDeleted: false,
    });
  });

  test("should not load any products and have loading is true", () => {
    const state = productReducer(
      initialState,
      fetchProducts.pending("pending", "")
    );
    expect(state).toEqual({
      products: [],
      categories: [],
      isLoading: true,
      productDetails: undefined,
      productCount: 0,
      error: "",
      searchText: "",
      sortType: "byPrice",
      sortOrder: "asc",
      isDeleted: false,
    });
  });

  test("should have a message in the error", () => {
    const error = new Error("An error occurred");

    const state = productReducer(
      initialState,
      fetchProducts.rejected(error, "rejected", "")
    );

    expect(state).toEqual({
      products: [],
      categories: [],
      isLoading: false,
      productDetails: undefined,
      productCount: 0,
      error: error.message,
      searchText: "",
      sortType: "asc",
      isDeleted: false,
    });
  });

  test("should fetch all the products from api", async () => {
    await store.dispatch(fetchProducts(GETURL));
    expect(store.getState().productReducer.products.length).toBe(2);
  });

  test("should fetch all the categories from api", async () => {
    await store.dispatch(fetchAllCategories(CATGET_URL));
    expect(store.getState().productReducer.categories.length).toBe(1);
  });

  test("should create new product", async () => {
    const product: any = {
      name: "Zara Blazer",
      price: 30,
      description: "Green zara blazer",
      images: ["https://placeimg.com/640/480/any"],
      categoryId: "1",
    };
    const token = localStorage.getItem("refresh-token") ?? "";
    const productObject = { baseUrl: GETURL, product: product, token };
    await store.dispatch(createProducts(productObject));
    expect(store.getState().productReducer.products.length).toBe(2);
  });
});

test("should update a product", async () => {
  const url = GETURL + "/1";
  const product: any = {
    name: "Zara Blazer",
    price: 100,
    description: "A green zara blazer",
    images: ["https://placeimg.com/640/480/any"],
    categoryId: "1",
  };
  const token = localStorage.getItem("refresh-token") ?? "";
  const productObject = { baseUrl: url, product, token };

  const expectedResult = {
    id: 1,
    name: "Zara Blazer",
    price: 100,
    description: "A green zara blazer",
    images: ["https://placeimg.com/640/480/any"],
    creationAt: "",
    updatedAt: "",
    category: {
      id: 1,
      name: "Clothes",
      image: "",
      creationAt: "",
      updatedAt: "",
    },
  };

  await store.dispatch(updateProduct(productObject));
  expect(store.getState().productReducer.productDetails?.name).toEqual(
    expectedResult.name
  );
});
