import { useEffect } from "react";
import Products from "../components/products/Products";
import { GETURL } from "../constants";

import { useAppDispatch } from "../redux/store";
import fetchProducts from "../redux/thunks/fetchProducts";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts(GETURL));
  }, [dispatch]);

  return <Products />;
};

export default ProductsPage;
