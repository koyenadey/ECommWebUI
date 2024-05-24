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
import { AppState, useAppDispatch } from "../../redux/store";
import { ReactEventHandler, useEffect, useState } from "react";
import {
  CreateOrdersType,
  OrderedProductsType,
  Product,
} from "../../misc/type";
import createOrder from "../../redux/thunks/createOrder";
import { ORDER_GETURL } from "../../constants";
import { removeFromCart, resetCart } from "../../redux/slices/cartSlice";
import SuccessModal from "../products/SuccessModal";

const OrderSummary = () => {
  const navigate = useNavigate();

  const [isSuccess, setIsSuceess] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setIsSuccessModalOpen(false);
    dispatch(resetCart());
    navigate("/order-history");
  };

  const dispatch = useAppDispatch();

  const subTotal: number = useSelector(
    (state: AppState) => state.cartReducer.subTotal
  );

  const token: string = useSelector(
    (state: AppState) => state.userReducer.tokens.refreshToken
  );

  const userId: string =
    useSelector((state: AppState) => state.userReducer.user?.id) ?? "";
  const addressId: string = useSelector(
    (state: AppState) => state.orderReducer.orderAddresId
  );
  const cartItems: Product[] = useSelector(
    (state: AppState) => state.cartReducer.cart
  );
  const addressSelected = useSelector(
    (state: AppState) => state.orderReducer.orderAddresId
  );
  const isDisabled = addressSelected ? false : true;

  const orderedProducts: OrderedProductsType[] = cartItems.map((product) => ({
    productId: product?.id,
    quantity: product?.inventory,
    priceAtPurchase: product?.price,
  }));

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const order: CreateOrdersType = {
      userId,
      addressId,
      orderedProducts,
    };

    var result = await dispatch(
      createOrder({ baseUrl: `${ORDER_GETURL}`, order, token })
    );
    if (result) {
      setIsSuceess(true);
    }
  };

  return (
    <>
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
            disabled={isDisabled}
            variant="contained"
            color="info"
            onClick={handleSubmit}
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
      <SuccessModal open={isSuccessModalOpen} onClose={handleClose} />
    </>
  );
};

export default OrderSummary;
