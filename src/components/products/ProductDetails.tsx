import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../store/slices/productSlices";
import { AppState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams<string>();
  const url = `https://fakestoreapi.com/products/${id}`;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(url));
  }, [dispatch, url]);

  const productDetails = useSelector(
    (state: AppState) => state.productReducer.productDetails
  );

  return (
    <>
      <h1>Product Details</h1>
      <p>{productDetails?.title}</p>
      <p>{productDetails?.price}</p>
    </>
  );
};

export default ProductDetails;
