import { useEffect } from "react";

import Products from "../components/products/Products";
import MasterPage from "../components/master-page/MasterPage";
import { GETCATPROD, GETURL } from "../constants";

import { useAppDispatch } from "../redux/store";
import fetchProducts from "../redux/thunks/fetchProducts";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const { productId } = useParams();

  const url = productId ? `${GETCATPROD}/${productId}/products` : GETURL;

  useEffect(() => {
    dispatch(fetchProducts(url));
  }, [dispatch, url]);

  return (
    <MasterPage>
      <Products />
    </MasterPage>
  );
};

export default ProductsPage;
