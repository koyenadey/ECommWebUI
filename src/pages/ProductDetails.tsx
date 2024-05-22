import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import fetchProducts from "../redux/thunks/fetchProducts";
import MasterPage from "../components/master-page/MasterPage";
import { addToCart } from "../redux/slices/cartSlice";
import { AppState, useAppDispatch } from "../redux/store";

import { CreateProductType, Product, ProductCart } from "../misc/type";
import { GETProdURL } from "../constants";
import * as Utils from "../utils/utils";
import {
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  MenuItem,
} from "@mui/material";
import OrderPagePopUp from "../components/cart/OrderPagePopUp";
import {
  StyledCartBtn,
  StyledDetailsHeader,
  StyledPrdDesc,
  StyledPrdDetails,
  StyledPrdHeader,
  StyledPrice,
  StyledQtyDdl,
  StyledSubTotalPrice,
} from "../styles/styles";

const ProductDetails = () => {
  const { id } = useParams<string>();
  const [qty, setQty] = useState<number>(1);
  const [showOrderPopUp, setShowOrderPopUp] = useState<boolean>(false);

  const navigate = useNavigate();

  const url = `${GETProdURL}/${id}`;
  const productQty: number[] = Utils.numbersArray(10);

  const storeDispatch = useAppDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    storeDispatch(fetchProducts(url));
  }, [storeDispatch, url]);

  const productDetails = useSelector(
    (state: AppState) => state.productReducer.productDetails
  );

  const qtyChangeHandler = (value: number) => {
    setQty(value as number);
  };

  const addToCartHandler = (item: Product, itemCount: number) => {
    const productToAdd: Product = JSON.parse(JSON.stringify(item));
    productToAdd.inventory = itemCount;

    dispatch(addToCart(productToAdd));
    navigate("/checkout/cart");
  };

  return (
    <MasterPage>
      <StyledDetailsHeader variant="h1">Product Details</StyledDetailsHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledPrdDetails key={productDetails?.id}>
          <CardMedia
            component="img"
            alt={productDetails?.name}
            height="20%"
            image={productDetails?.images[0].imageUrl}
          />
          <CardContent>
            <StyledPrdHeader gutterBottom variant="h5" component="div">
              {productDetails?.name}
            </StyledPrdHeader>
            <StyledPrdDesc variant="body2" color="text.secondary" m={2}>
              {productDetails?.description}
            </StyledPrdDesc>
            <Divider />
            <StyledSubTotalPrice>
              <Box m={2}>
                <StyledPrice component="span">
                  SubTotal : {productDetails?.price}€
                </StyledPrice>
              </Box>
            </StyledSubTotalPrice>
          </CardContent>
          <CardActions>
            <StyledQtyDdl
              value={qty}
              label="quantity"
              onChange={(event) =>
                qtyChangeHandler(event.target.value as number)
              }
            >
              {productQty.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </StyledQtyDdl>
            {productDetails && (
              <StyledCartBtn
                size="small"
                onClick={(event) => addToCartHandler(productDetails, qty)}
              >
                Add to Cart
              </StyledCartBtn>
            )}
          </CardActions>
        </StyledPrdDetails>
        {showOrderPopUp && <OrderPagePopUp />}
      </Box>
    </MasterPage>
  );
};

export default ProductDetails;
