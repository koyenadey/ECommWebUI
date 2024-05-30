import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppState } from "../redux/store";

import MasterPage from "../components/master-page/MasterPage";

import {Box, Button, Typography} from "@mui/material";
import { EditButton, FormInput } from "../styles/styles";
import OrderDetails from "../components/cart/OrderDetails";
import OrderSummary from "../components/cart/OrderSummary";
import CartVertical from "../components/cart/CartVertical";

const Cart = () => {
  const navigate = useNavigate();

  const cartItemCount: number = useSelector(
    (state: AppState) => state.cartReducer.quantity
  );

  return (
    <MasterPage>
      {cartItemCount > 0 && (
        <Box>
          {/*<OrderDetails />
          <OrderSummary />*/}
          <CartVertical />
        </Box>
      )}

      {cartItemCount === 0 && (
        <Box width="100%" textAlign="center" marginY="150px">
          <Typography component="blockquote">Your cart is empty. No products to display. Start shopping to continue checkout.</Typography>
          <Button variant="contained" onClick={() => navigate("/products/all")} sx={{maxWidth: "450px"}}>
            Start Shopping
          </Button>
        </Box>
      )}
    </MasterPage>
  );
};

export default Cart;
