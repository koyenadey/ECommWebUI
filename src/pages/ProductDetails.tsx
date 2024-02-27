import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import fetchProducts from "../redux/thunks/fetchProducts";
import MasterPage from "../components/master-page/MasterPage";
import { addToCart } from "../redux/slices/cartSlices";
import { AppState, useAppDispatch } from "../redux/store";

import { Product } from "../misc/type";
import { GETURL } from "../constants";
import * as Utils from "../utils/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams<string>();
  const [qty, setQty] = useState<number>(1);

  const navigate = useNavigate();
  const url = `${GETURL}/${id}`;
  const productQty: number[] = Utils.numbersArray(10);

  const storeDispatch = useAppDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    storeDispatch(fetchProducts(url));
  }, [storeDispatch, url]);

  const productDetails = useSelector(
    (state: AppState) => state.productReducer.productDetails
  );

  const qtyChangeHandler = (value: string | number) => {
    setQty(value as number);
  };

  const addToCartHandler = (item: Product, itemCount: number) => {
    const productToAdd = JSON.parse(JSON.stringify(item));
    productToAdd.quantity = itemCount;

    dispatch(addToCart(productToAdd));
    navigate("/checkout/cart");
  };

  return (
    <MasterPage>
      <Box sx={{ margin: "2%" }}>
        <h1>Product Details</h1>
        <Card sx={{ maxWidth: "50%", margin: "auto" }} key={productDetails?.id}>
          <CardMedia
            component="img"
            alt={productDetails?.title}
            height="20%"
            image={productDetails?.category.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productDetails?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" m={2}>
              {productDetails?.description}
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box m={2}>
                <Typography component="span">
                  SubTotal : {productDetails?.price}€
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Select
              value={qty}
              label="quantity"
              onChange={(event) => qtyChangeHandler(event.target.value)}
            >
              {productQty.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
            {productDetails && (
              <Button
                size="small"
                onClick={() => addToCartHandler(productDetails, qty)}
              >
                Add to Cart
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </MasterPage>
  );
};

export default ProductDetails;
