import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import {
  GETCATPRD_COUNTURL,
  GETCATPROD,
  GETURL,
  GET_COUNTURL,
} from "../constants";
import fetchProducts from "../redux/thunks/fetchProducts";
import fetchProductCount from "../redux/thunks/fetchProductCount";

const useFetchProducts = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const url = id ? `${GETURL}/category/${id}` : GETURL;
  const prodCountUrl = id ? `${GETCATPRD_COUNTURL}/${id}/meta` : GET_COUNTURL;

  useEffect(() => {
    console.log("coming here : " + url + " and " + prodCountUrl);
    dispatch(fetchProductCount(prodCountUrl));
    dispatch(fetchProducts(url));
  }, [dispatch, url, prodCountUrl]);
};

export default useFetchProducts;
