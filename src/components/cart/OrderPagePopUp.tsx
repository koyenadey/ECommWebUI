import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  SnackbarOrigin,
  Typography,
} from "@mui/material";

import AddQuantity from "./AddQuantity";
import { AppState, useAppDispatch } from "../../redux/store";
import { ProductCart } from "../../misc/type";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { removeFromCart } from "../../redux/slices/cartSlice";
import { EditButton } from "../../styles/styles";

interface State extends SnackbarOrigin {
  open: boolean;
}

const OrderPagePopUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [addItemNotify, setAddItemNotify] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [notifyMessage, setNotifyMessage] = useState<string>("");

  const [open, setOpen] = useState(true);

  const cartItems: ProductCart[] = useSelector(
    (state: AppState) => state.cartReducer.cart
  );

  const subTotal: number = useSelector(
    (state: AppState) => state.cartReducer.subTotal
  );

  const removeItemHandler = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <Slide
      direction="left"
      in={open}
      mountOnEnter
      unmountOnExit
      {...(open
        ? {
            timeout: { enter: 1000, exit: 1000 },
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          }
        : {})}
    >
      <Box>
        <List
          sx={{
            border: "1px solid black",
            width: "35%",
            bgcolor: "background.paper",
            height: "100vh",
          }}
        >
          <ListItem sx={{ backgroundColor: "black", color: "white" }}>
            <ListItemIcon onClick={() => setOpen(false)}>
              <ArrowForwardIosIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">Cart</Typography>
            </ListItemText>
          </ListItem>
          <Divider />
          {cartItems.map((item) => (
            <Box key={item.id}>
              <ListItem sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ height: "50%", width: "40%", overflow: "hidden" }}>
                  <img
                    width="100%"
                    height="auto"
                    srcSet={`${item.category.image}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.category.image}?w=50&h=50&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </Box>
                <Box>
                  <Typography ml={2} mt={1} variant="body1">
                    {item.title}
                  </Typography>
                  <Typography ml={2} mt={1} variant="subtitle1">
                    {item.price}
                  </Typography>
                  <AddQuantity
                    item={item}
                    onNotify={setNotifyMessage}
                    onAddItemNotify={setAddItemNotify}
                  />
                </Box>
                <ListItemIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => removeItemHandler(item.id)}
                >
                  <CloseIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </Box>
          ))}
          {subTotal > 0 && (
            <ListItem>
              <ListItemText
                primary="Subtotal"
                secondary={`${subTotal}€`}
              ></ListItemText>
            </ListItem>
          )}
          {subTotal < 1 && (
            <ListItem>
              <ListItemText>
                <Typography variant="subtitle1">Cart is empty</Typography>
              </ListItemText>
            </ListItem>
          )}
          {subTotal > 0 && (
            <ListItem>
              <ListItemButton onClick={() => navigate("/checkout/cart")}>
                <EditButton>View Cart</EditButton>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Slide>
  );
};

export default OrderPagePopUp;
