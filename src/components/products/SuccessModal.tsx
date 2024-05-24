import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} display="flex" flexDirection="column" alignItems="center">
        <CheckCircleIcon style={{ color: "green", fontSize: 60 }} />
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Successful!
        </Typography>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
