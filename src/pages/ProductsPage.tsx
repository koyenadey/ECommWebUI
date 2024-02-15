//import { Products } from "../misc/type";
import { useEffect } from "react";
import Products from "../components/products/Products";
import { useAppDispatch } from "../components/store/store";
import { fetchProducts } from "../components/store/slices/productSlices";

const ProductsPage = () => {
  const url = "https://fakestoreapi.com/products";
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts(url));
  }, [dispatch]);

  return <Products />;
};

export default ProductsPage;
