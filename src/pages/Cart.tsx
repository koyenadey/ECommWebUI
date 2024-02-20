import { useState } from "react";

import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

import { removeFromCart, updateCart } from "../redux/slices/cartSlices";

import CartDialogue from "../components/cart/CartDialogue";
import { ProductCart, UpdateProductCart } from "../misc/type";
import * as Utils from "../utils/utils";

import {
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

const Cart = () => {
  const [dialogueIsOpen, setDialogueOpen] = useState<boolean>(false);
  const [deleteProdId, setDelProdId] = useState<number | undefined>(undefined);

  const dispatch = useAppDispatch();

  const cartData: ProductCart[] = useSelector(
    (state: AppState) => state.cartReducer.cart
  );

  const cartDataQty: number = useSelector(
    (state: AppState) => state.cartReducer.quantity
  );

  const productQty = Utils.numbersArray(10);

  const qtyChangeHandler = (qty: number | string, itemId: number) => {
    const productToBeUpdated: UpdateProductCart = {
      productId: itemId,
      quantity: qty as number,
    };
    dispatch(updateCart(productToBeUpdated));
  };

  const removeItemHandler = (productId: number) => {
    setDialogueOpen(true);
    setDelProdId(productId);
  };

  const confirmDeleteHandler = (confirm: boolean) => {
    if (confirm) {
      dispatch(removeFromCart(deleteProdId as number));
    } else {
      setDelProdId(undefined);
    }
    setDialogueOpen(false);
  };

  return (
    <>
      <CartDialogue isOpen={dialogueIsOpen} onClose={confirmDeleteHandler} />
      <h1>This is cart page</h1>
      {cartData.map((item) => (
        <Card sx={{ maxWidth: 345 }} key={item.id}>
          <CardMedia
            component="img"
            alt={item.title}
            height="200"
            image={item.category.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" m={2}>
              {item.description}
            </Typography>
            <Divider />
            <Typography variant="h5" m={2}>
              SubTotal : {item.price * item.quantity}€
            </Typography>
          </CardContent>
          <CardActions>
            <Select
              value={item.quantity}
              label="quantity"
              onChange={(event) =>
                qtyChangeHandler(event.target.value, item.id)
              }
            >
              {productQty.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
            <Button size="small" onClick={() => removeItemHandler(item.id)}>
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
      <p>The cart has {cartDataQty} product</p>
    </>
  );
};

export default Cart;
