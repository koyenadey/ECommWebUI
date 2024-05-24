import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void; // Function to handle login
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Login Required
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Please login to place an order.
        </Typography>
        <Button
          variant="contained"
          onClick={onLogin}
          sx={{ mt: 2, backgroundColor: "black", color: "white" }}
        >
          Login
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
