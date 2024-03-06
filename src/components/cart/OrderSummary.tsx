import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  EditButton,
  StyledCartSumm,
  StyledCartTot,
  StyledCartTotVal,
  StyledCheckOut,
  StyledDivider,
  StyledEstiDel,
  StyledLock,
  StyledSubTot,
} from "../../styles/styles";
import { AppState } from "../../redux/store";

const OrderSummary = () => {
  const navigate = useNavigate();
  const subTotal: number = useSelector(
    (state: AppState) => state.cartReducer.subTotal
  );

  return (
    <List
      sx={{
        width: "30%",
        margin: "2%",
      }}
    >
      <ListItem>
        <ListItemText>
          <StyledCartSumm>Order Summary</StyledCartSumm>
        </ListItemText>
      </ListItem>
      <StyledDivider />
      <ListItem>
        <ListItemText>
          <StyledSubTot variant="subtitle1">Subtotal</StyledSubTot>
          <StyledEstiDel>Estimate Delivery</StyledEstiDel>
        </ListItemText>
        <ListItemText>
          <StyledSubTot variant="subtitle1">{subTotal}€</StyledSubTot>
        </ListItemText>
      </ListItem>
      <StyledDivider />
      <ListItem>
        <ListItemText>
          <StyledCartTot>Total</StyledCartTot>
        </ListItemText>
        <ListItemText>
          <StyledCartTotVal>{subTotal}€</StyledCartTotVal>
        </ListItemText>
      </ListItem>
      <StyledDivider />
      <ListItem>
        <EditButton
          variant="contained"
          color="info"
          onClick={() => navigate("/checkout/cart")}
        >
          Checkout
        </EditButton>
      </ListItem>
      <ListItem>
        <ListItemIcon sx={{ cursor: "pointer" }}>
          <StyledLock />
          <StyledCheckOut component="span">Secure Checkout</StyledCheckOut>
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

export default OrderSummary;
