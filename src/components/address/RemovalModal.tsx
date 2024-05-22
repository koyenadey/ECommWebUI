import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddressType } from "../../misc/type";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import {
  modalHeaderFailed,
  modalHeaderWarning,
  modalMessageFailed,
  modalMessageWarning,
} from "../../data/data";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

type RemovalModalType = {
  open: boolean;
  handleClose: (action: string, id: string) => void;
  address: AddressType;
};

const RemovalModal = ({ open, handleClose, address }: RemovalModalType) => {
  const defaultAddId = useSelector(
    (state: AppState) => state.userReducer.defaultAddId
  );

  const actionVal = defaultAddId === address.id ? "No" : "Yes";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="removal-failed-title"
      aria-describedby="removal-failed-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="removal-failed-title" variant="h6" component="h2">
            {defaultAddId === address.id
              ? modalHeaderFailed
              : modalHeaderWarning}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => handleClose(actionVal, address.id)}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Typography variant="body1" component="div">
            {address.user.userName}
          </Typography>
          <Typography variant="body2" component="div">
            {address.addressLine}, {address.street}, {address.city}
          </Typography>
          <Typography variant="body2" component="div">
            {address.country}
          </Typography>
          <Typography variant="body2" component="div">
            {address.postcode}
          </Typography>
          <Typography variant="body2" component="div">
            Phone number: {address.phoneNumber}
          </Typography>
          <Box mt={2}>
            <Typography
              id="removal-failed-description"
              variant="body2"
              color="error"
            >
              {defaultAddId === address.id
                ? modalMessageFailed
                : modalMessageWarning}
            </Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={() => handleClose(actionVal, address.id)}
              variant="contained"
              color="warning"
            >
              {defaultAddId === address.id ? "Cancel" : "Delete"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RemovalModal;
