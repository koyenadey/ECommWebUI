import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppState } from "../redux/store";

import MasterPage from "../components/master-page/MasterPage";

import { Box, Typography } from "@mui/material";
import { EditButton, FormInput } from "../styles/styles";
import OrderDetails from "../components/cart/OrderDetails";
import OrderSummary from "../components/cart/OrderSummary";

const Cart = () => {
  const navigate = useNavigate();

  const cartItemCount: number = useSelector(
    (state: AppState) => state.cartReducer.quantity
  );

  return (
    <MasterPage>
      <Box sx={{ display: "flex" }}>
        <OrderDetails />
        {cartItemCount > 0 && <OrderSummary />}
      </Box>

      {cartItemCount === 0 && (
        <FormInput>
          <Typography component="blockquote">The cart is empty</Typography>
          <EditButton onClick={() => navigate("/products/all")}>
            Start Shopping
          </EditButton>
        </FormInput>
      )}
    </MasterPage>
  );
};

export default Cart;
