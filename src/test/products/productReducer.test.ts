import { CATGET_URL, GETURL } from "../../constants";
import { mockProducts } from "../../data/data";
import { CreateProductType } from "../../misc/type";
import productReducer from "../../redux/slices/productSlices";
import store from "../../redux/store";
import createProducts from "../../redux/thunks/createProducts";
import fetchAllCategories from "../../redux/thunks/fetchAllCategories";
import fetchProducts from "../../redux/thunks/fetchProducts";
import { productServer } from "../shared/productServer";

const initialState = {
  products: [],
  categories: [],
  productDetails: undefined,
  isLoading: false,
  error: "",
  productCount: 0,
};

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

describe("Product Reducer", () => {
  //To test the initial state
  test("should return initial state", () => {
    const state = productReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  //testing the fulfilled state of async thunk
  test("should return a list of products", () => {
    const state = productReducer(
      initialState,
      fetchProducts.fulfilled(mockProducts, "fulfilled", "")
    );
    expect(state).toEqual({
      products: Array.isArray(mockProducts) ? mockProducts : [],
      isLoading: false,
      productDetails: Array.isArray(mockProducts) ? undefined : mockProducts,
      productCount: mockProducts.length,
      error: "",
    });
  });

  test("should not load any products and have loading is true", () => {
    const state = productReducer(
      initialState,
      fetchProducts.pending("pending", "")
    );
    expect(state).toEqual({
      products: [],
      isLoading: true,
      productDetails: undefined,
      productCount: 0,
      error: "",
    });
  });

  test("should have a message in the error", () => {
    const error = new Error("");
    const state = productReducer(
      initialState,
      fetchProducts.rejected(error, "rejected", "")
    );
    expect(state).toEqual({
      products: [],
      isLoading: false,
      productDetails: undefined,
      productCount: 0,
      error: error.message,
    });
  });

  //test asyncthunk --- products
  test("should fetch all the products from api", async () => {
    await store.dispatch(fetchProducts(GETURL));
    expect(store.getState().productReducer.products.length).toBe(2);
  });

  //testasyncthunk --- categories
  test("should fetch all the categories from api", async () => {
    await store.dispatch(fetchAllCategories(CATGET_URL));
    expect(store.getState().productReducer.categories.length).toBe(1);
  });

  //should create product in the server
  test("should create new product", async () => {
    const product: CreateProductType = {
      title: "Zara Blazer",
      price: 30,
      description: "Green zara blazer",
      images: ["https://placeimg.com/640/480/any"],
      categoryId: 1,
    };
    const productObject = { baseUrl: GETURL, product: product };
    await store.dispatch(createProducts(productObject));
    expect(store.getState().productReducer.products.length).toBe(2);
  });
});
