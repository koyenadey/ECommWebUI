import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { GETCATPROD, GETURL } from "../constants";
import fetchProducts from "../redux/thunks/fetchProducts";

const useFetchProducts = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const url = productId ? `${GETCATPROD}/${productId}/products` : GETURL;

  useEffect(() => {
    dispatch(fetchProducts(url));
  }, [dispatch, url]);
};

export default useFetchProducts;
