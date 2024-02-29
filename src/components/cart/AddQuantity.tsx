import { Box, IconButton, SnackbarOrigin, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "../../redux/store";
import { updateCart } from "../../redux/slices/cartSlices";

import { ProductCart } from "../../misc/type";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface AddQuantityType {
  item: ProductCart;
  onNotify: (message: string) => void;
  onAddItemNotify: (obj: State) => void;
}

const AddQuantity = ({ item, onNotify, onAddItemNotify }: AddQuantityType) => {
  const dispatch = useAppDispatch();

  const addItemHandler = (id: number, action: string) => {
    const qty = item.quantity;

    if (action === "increement") {
      dispatch(updateCart({ productId: id, quantity: qty + 1 }));
      onNotify(`${item?.title} Added Succesfully`);
      onAddItemNotify({ open: true, vertical: "top", horizontal: "right" });
    }
    if (action === "decreement") {
      dispatch(updateCart({ productId: id, quantity: qty - 1 }));
      onNotify(`${item?.title} removed from the cart`);
      onAddItemNotify({ open: true, vertical: "top", horizontal: "right" });
    }
  };
  return (
    <Box
      sx={{
        minWidth: "80px",
        margin: "10%",
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton disabled={item.quantity === 0 ? true : false}>
        <RemoveIcon onClick={() => addItemHandler(item.id, "decreement")} />
      </IconButton>
      <Typography p={1}>{item.quantity}</Typography>
      <IconButton>
        <AddIcon onClick={() => addItemHandler(item.id, "increement")} />
      </IconButton>
    </Box>
  );
};

export default AddQuantity;
