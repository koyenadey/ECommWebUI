import { SnackbarOrigin } from "@mui/material";

import { useAppDispatch } from "../../redux/store";
import { updateCart } from "../../redux/slices/cartSlice";

import { Product, ProductCart } from "../../misc/type";
import {
  StyledActionBtnsAdd,
  StyledActionBtnsRemove,
  StyledAddQty,
  StyledQty,
  StyledQtyVal,
} from "../../styles/styles";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface AddQuantityType {
  item: Product;
  onNotify: (message: string) => void;
  onAddItemNotify: (obj: State) => void;
}

const AddQuantity = ({ item, onNotify, onAddItemNotify }: AddQuantityType) => {
  const dispatch = useAppDispatch();

  const addItemHandler = (id: string, action: string) => {
    const qty = item.inventory;

    if (action === "increement") {
      dispatch(updateCart({ productId: id, quantity: qty + 1 }));
      onNotify(`${item?.name} Added Succesfully`);
      onAddItemNotify({ open: true, vertical: "top", horizontal: "right" });
    }
    if (action === "decreement") {
      dispatch(updateCart({ productId: id, quantity: qty - 1 }));
      onNotify(`${item?.name} removed from the cart`);
      onAddItemNotify({ open: true, vertical: "top", horizontal: "right" });
    }
  };
  return (
    <StyledAddQty>
      <StyledQty disabled={item.inventory === 0 ? true : false}>
        <StyledActionBtnsRemove
          onClick={() => addItemHandler(item.id, "decreement")}
        />
      </StyledQty>
      <StyledQtyVal>{item.inventory}</StyledQtyVal>
      <StyledQty>
        <StyledActionBtnsAdd
          onClick={() => addItemHandler(item.id, "increement")}
        />
      </StyledQty>
    </StyledAddQty>
  );
};

export default AddQuantity;
