import { useState } from "react";

import {
  Alert,
  Box,
  Divider,
  ListItem,
  ListItemText,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from "@mui/material";

import { Product, ProductCart } from "../../misc/type";
import CartDialogue from "./CartDialogue";

import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { removeFromCart } from "../../redux/slices/cartSlice";
import AddQuantity from "./AddQuantity";
import {
  StyledActionBtnsClose,
  StyledCartHeader,
  StyledDivider,
  StyledListItemText,
  StyledOrderDetList,
  StyledPrdTitle,
  StyledRemItemQty,
  StyledTotItemPrice,
} from "../../styles/styles";
import AddressModal from "../address/AddressModal";

interface State extends SnackbarOrigin {
  open: boolean;
}

const OrderDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dialogueIsOpen, setDialogueOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDelete] = useState<string | null>(null);
  const [addItemNotify, setAddItemNotify] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [notifyMessage, setNotifyMessage] = useState<string>("");

  const { vertical, horizontal } = addItemNotify;

  const dispatch = useAppDispatch();

  const cartData: Product[] = useSelector(
    (state: AppState) => state.cartReducer.cart
  );

  const { isLoggedIn } = useSelector((state: AppState) => state.userReducer);

  const removeItemHandler = (itemId: string) => {
    setItemToDelete(itemId);
    setDialogueOpen(true);
  };

  const confirmDeleteHandler = (confirm: boolean) => {
    if (confirm) {
      dispatch(removeFromCart(itemToDeleteId as string));
    } else {
      setItemToDelete(null);
    }
    setDialogueOpen(false);
  };

  const closeItemNotifyHandler = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway" || reason === "escapeKeyDown") {
      return;
    }

    setAddItemNotify({ ...addItemNotify, open: false });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CartDialogue isOpen={dialogueIsOpen} onClose={confirmDeleteHandler} />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={addItemNotify.open}
        autoHideDuration={2000}
        onClose={closeItemNotifyHandler}
      >
        <Alert
          onClose={closeItemNotifyHandler}
          severity="success"
          variant="standard"
          sx={{ width: "100%" }}
        >
          {notifyMessage}
        </Alert>
      </Snackbar>
      <StyledOrderDetList>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {!isLoggedIn && (
            <ListItem>
              <Typography variant="h5">
                You must login to place an order
              </Typography>
            </ListItem>
          )}
          <ListItem>
            <StyledCartHeader>My Cart</StyledCartHeader>
          </ListItem>
          {isLoggedIn && (
            <ListItem sx={{ mx: "2%" }}>
              <Typography sx={{ color: "blue" }} onClick={handleOpenModal}>
                Select Address
              </Typography>
            </ListItem>
          )}
        </Box>
        <StyledDivider />
        {cartData.map((item) => (
          <Box key={item.id}>
            {item.inventory > 0 && (
              <ListItem>
                <img
                  height="10%"
                  width="20%"
                  srcSet={`${item.images[0].imageUrl}?w=50&h=50&fit=crop&auto=format&dpr=5 20x`}
                  src={`${item.images[0].imageUrl}?w=50&h=50&fit=crop&auto=format`}
                  alt={item.name}
                  loading="lazy"
                />

                <StyledListItemText>
                  <StyledPrdTitle variant="body1">{item.name}</StyledPrdTitle>
                </StyledListItemText>
                <ListItemText>
                  <AddQuantity
                    item={item}
                    onNotify={setNotifyMessage}
                    onAddItemNotify={setAddItemNotify}
                  />
                </ListItemText>
                <ListItemText>
                  <StyledTotItemPrice variant="subtitle1">
                    {item.inventory * item.price}€
                  </StyledTotItemPrice>
                </ListItemText>
                <StyledRemItemQty onClick={() => removeItemHandler(item.id)}>
                  <StyledActionBtnsClose />
                </StyledRemItemQty>
              </ListItem>
            )}
            <StyledDivider />
          </Box>
        ))}
      </StyledOrderDetList>
      <AddressModal open={isModalOpen} handleClose={handleCloseModal} />
    </>
  );
};

export default OrderDetails;
