import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface CartDialogueProps {
  isOpen: boolean;
  onClose: (isClose: boolean) => void;
}

const CartDialogue = (props: CartDialogueProps) => {
  const { isOpen, onClose } = props;
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove this item from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(true)}>Yes</Button>
          <Button onClick={() => onClose(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartDialogue;
