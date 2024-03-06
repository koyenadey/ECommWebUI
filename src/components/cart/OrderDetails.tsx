import { useState } from "react";

import {
  Alert,
  Box,
  Divider,
  ListItem,
  ListItemText,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";

import { ProductCart } from "../../misc/type";
import CartDialogue from "./CartDialogue";

import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { removeFromCart } from "../../redux/slices/cartSlices";
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

interface State extends SnackbarOrigin {
  open: boolean;
}

const OrderDetails = () => {
  const [dialogueIsOpen, setDialogueOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDelete] = useState<number | null>(null);
  const [addItemNotify, setAddItemNotify] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [notifyMessage, setNotifyMessage] = useState<string>("");

  const { vertical, horizontal } = addItemNotify;

  const dispatch = useAppDispatch();

  const cartData: ProductCart[] = useSelector(
    (state: AppState) => state.cartReducer.cart
  );

  const removeItemHandler = (itemId: number) => {
    setItemToDelete(itemId);
    setDialogueOpen(true);
  };

  const confirmDeleteHandler = (confirm: boolean) => {
    if (confirm) {
      dispatch(removeFromCart(itemToDeleteId as number));
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
        <ListItem>
          <StyledCartHeader>My Cart</StyledCartHeader>
        </ListItem>
        <StyledDivider />
        {cartData.map((item) => (
          <Box key={item.id}>
            {item.quantity > 0 && (
              <ListItem>
                <img
                  height="10%"
                  width="20%"
                  srcSet={`${item.category.image}?w=50&h=50&fit=crop&auto=format&dpr=5 20x`}
                  src={`${item.category.image}?w=50&h=50&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />

                <StyledListItemText>
                  <StyledPrdTitle variant="body1">{item.title}</StyledPrdTitle>
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
                    {item.quantity * item.price}€
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
    </>
  );
};

export default OrderDetails;
