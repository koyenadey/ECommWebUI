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
  onClose: (isClose: boolean, removeText?: string) => void;
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
        <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Delete this item?
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
