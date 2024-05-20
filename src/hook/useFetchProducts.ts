import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { GETCATPROD, GETURL, GET_COUNTURL } from "../constants";
import fetchProducts from "../redux/thunks/fetchProducts";
import fetchProductCount from "../redux/thunks/fetchProductCount";

const useFetchProducts = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const url = productId ? `${GETCATPROD}/${productId}/products` : GETURL;

  useEffect(() => {
    dispatch(fetchProductCount(GET_COUNTURL));
    dispatch(fetchProducts(url));
  }, [dispatch, url]);
};

export default useFetchProducts;
